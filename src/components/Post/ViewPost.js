/**
 * Created by Xiaoxin on 24/03/2018.
 */

import React, {Component} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  Toast
} from 'native-base';
import {Image, Modal, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
// import ImagePreview from 'react-native-image-preview';
import ImageViewer from 'react-native-image-zoom-viewer';
import StarRating from 'react-native-star-rating';
import network from '../../network/index';
import moment from 'moment';
import {ImagePicker} from "expo";

class ViewPost extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      creatorId: 0,
      postId: this.props.navigation.state.params.postId,
      com: "",
      error: false,
      up: false,
      pictureModalShow: false,
      loading: true,
    };
    this.postComment = this.postComment.bind(this);
    this.upvote = this.upvote.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    console.log(this.state.postId);
    network.social.getPostByPostId(this.state.postId)
      .then(res => {
        this.state.creatorId = res.creatorId;
        this.setState({loading: false})
        this.props.dispatch({type: "GET_POST_INFO", data: res});
      })
      .catch(err => {

      })
  }

    upvote() {
        //this.props.dispatch({type: "UPVOTE_POST", data: this.props.post.upvoteCount + 1});
      console.log("user = " + this.props.user);
      network.social.hasUpvoted(this.state.postId, this.props.user.userId)
      .then(res => res.text())
      .then(res => {
        console.log(res);
        console.log("=========== hasUpvoted???? ===========");
        console.log("postId = " + this.state.postId);
        console.log("userId = " + this.props.user.userId);
        //console.log(res["_bodyText"]);
        if (res == "Not Upvoted") {
          network.social.upvotePost(this.state.postId)
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                console.log("=========== UPVOTE ===========");
                console.log("postID = " + this.state.postId);
                network.social.getPostByPostId(this.state.postId)
                  .then(res => {
                    console.log(res);
                    this.props.dispatch({type: "GET_POST_INFO", data: res});
                  })
                  .catch(err => {

                  });
                  
                console.log("upvoteCount = " + this.props.post.upvoteCount);
            })
            .catch((e) => {
              this.setState({
                error: true
              });
              console.log("ERR" + e.message);
            });
        }

        else {
          //console.log("=========== DOWNVOTE ===========");
          network.social.deleteUpvoteOfPost(this.state.postId, res)
            .then((res) => {
                console.log(res);
                console.log("=========== DOWNVOTE ===========");
                //console.log("postID = " + this.state.postId);
                network.social.getPostByPostId(this.state.postId)
                  .then(res => {
                    console.log(res);
                    this.props.dispatch({type: "GET_POST_INFO", data: res});
                  })
                  .catch(err => {

                  });
                console.log("upvoteCount = " + this.props.post.upvoteCount);
            })
            .catch((e) => {
              this.setState({
                error: true
              });
              console.log("ERR" + e.message);
            });
        }
      })
    }


  postComment() {
    console.log("66666" + this.state.com);
    console.log(this.state.postId + " ====== " + this.state.com);
    if (!this.state.com) return;
    network.comment.postComment({postId: this.state.postId, content: this.state.com})
      .then(response => response.json())
      .then((res) => {
        //res = res.json();
        console.log(res);
        console.log(this.state.postId);

        network.social.getPostByPostId(this.state.postId)
          .then(res => {
            console.log(res);
            this.props.dispatch({type: "GET_POST_INFO", data: res});
          })
          .catch(err => {

          })
      })
      .catch((e) => {
        this.setState({
          error: true
        });
        console.log("ERR" + e.message);
      });
    this.setState({com: ""});
  }

  deletePost() {
    if (this.props.user.userId == this.state.creatorId) {

      network.social.deletePost(this.state.postId)
        .then((res) => {
          console.log(res);
          console.log("=========== Delete ===========");
          console.log("postID = " + this.state.postId);
        })
        .catch((e) => {
          this.setState({
            error: true
          });
          console.log("ERR " + e.message);
        });
      this.props.navigation.navigate('Profile');
    }
  }

  editPost(postId) {
    if (this.props.user.userId == this.state.creatorId) {
      let result;
      result = ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      result.then((result) => {
        // console.log(result);
        if (!result.cancelled) {
          this.props.navigation.navigate('EditPost', {
            postId,
            image: result.uri,
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  handleClickUser(commenterId) {
    this.props.navigation.navigate('User', {
      userId: commenterId
    });
  }

  render() {
    let image = this.props.post.imageUrl;
    if (!image)
      image = "http://via.placeholder.com/100x100";
    let reviews;
    if (this.props.post.comments)
      reviews = this.props.post.comments.map(item => {
          let avatar = item.commenterAvatar;
          if (!avatar)
            avatar = "http://via.placeholder.com/100x100";
          let name = item.commenter;
          if (!name)
            name = "Xiaoxin"
          return (
            <Card key={item.commentId}>
              <ScrollView>
                <CardItem>
                  <TouchableWithoutFeedback onPress={() => this.handleClickUser(item.commenterId)}>
                    <Left>
                      <Thumbnail small source={{cache: 'force-cache', uri: avatar}}/>
                      <Body>
                      <Text style={{fontSize: 16}}>{name}</Text>
                      </Body>
                    </Left>
                  </TouchableWithoutFeedback>
                </CardItem>
                <ListItem>
                  <Left>
                    <Text>{item.content}</Text>
                  </Left>
                  <Right>
                    <Text>{moment(item.time).fromNow()}</Text>
                  </Right>
                </ListItem>
              </ScrollView>
            </Card>
          )
        }
      );
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar backgroundColor="blue" barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.onBackPress.bind(this)}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Post</Title>
          </Body>
          {this.props.user.userId == this.state.creatorId &&
          <Right>

            <Button transparent onPress={this.editPost.bind(this, this.state.postId)}>
              <Icon style={{color: 'white'}} name='cut'/>
              {/*icon name here was attached prefix 'ios-' automatically */}
            </Button>
            {this.state.error && Toast.show({
              text: 'Can\'t edit!',
              position: 'bottom',
              buttonText: 'Okay'
            })
            }

            <Button transparent onPress={this.deletePost}>
              <Icon style={{color: 'white'}} name='trash'/>
              {/*icon name here was attached prefix 'ios-' automatically */}
            </Button>
            {this.state.error && Toast.show({
              text: 'Can\'t delete!',
              position: 'bottom',
              buttonText: 'Okay'
            })
            }

          </Right>}
          {this.props.user.userId != this.state.creatorId &&
          <Right/>}
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
        <Content>
          <Body>
          <Text style={{paddingVertical: 12, fontSize: 15}}>{this.props.post.dishName}</Text>
          </Body>
          <Card>
            <TouchableWithoutFeedback onPress={() => (this.setState({pictureModalShow: true}))}>
              <CardItem cardBody style={styles.star}>
                <Image source={{uri: image}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            </TouchableWithoutFeedback>
            <Modal visible={this.state.pictureModalShow} transparent={true}>
              <ImageViewer imageUrls={[{url: image}]} enableImageZoom={true}
                           onCancel={() => (this.setState({pictureModalShow: false}))}
                           onClick={() => (this.setState({pictureModalShow: false}))}/>
            </Modal>
            {/*<ImagePreview visible={this.state.pictureModalShow} source={{uri:image}} close={() => (this.setState({pictureModalShow: false}))} />*/}
            <StarRating
              disabled={true}
              maxStars={5}
              rating={this.props.post.rate}
              containerStyle={{marginTop: 3, alignSelf: "center"}}
              fullStarColor={"#f5af4b"}
              emptyStarColor={"#f5af4b"}
              halfStarEnabled
              starSize={30}
            />
            <CardItem>
              <Left>
                <Button transparent onPress={this.upvote}>
                  <Icon active name="thumbs-up"/>
                  <Text>{this.props.post.upvoteCount} Likes</Text>
                </Button>
                {this.state.error && Toast.show({
                  text: 'Can\'t upvote!',
                  position: 'bottom',
                  buttonText: 'Okay'
                })
                }
              </Left>
              <Right>
                <Text>{this.props.post.restaurantName}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>{this.props.post.content}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Item rounded style={styles.comment}>
                <Input placeholder='Comment...' value={this.state.com}
                       onChangeText={(val) => this.setState({com: val})}/>
              </Item>
              <Right>
                <Button onPress={this.postComment}>
                  <Text>Post</Text>
                </Button>
                {this.state.error && Toast.show({
                  text: 'Can\'t comment!',
                  position: 'bottom',
                  buttonText: 'Okay'
                })
                }
              </Right>
            </CardItem>
          </Card>

          <List>
            {reviews}
          </List>
        </Content>}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  star: {
    marginBottom: 15,
  },
  comment: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 80,
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    dish: state.dish,
    post: state.post,
    user: state.user
  }
};

export default connect(
  mapStateToProps
)(ViewPost);