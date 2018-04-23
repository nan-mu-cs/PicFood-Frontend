/**
 * Created by jin on 19/03/2018.
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
  Fab,
  Icon,
  Left,
  List,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import {Image, StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import network from '../../network';
import {ImagePicker} from "expo";

class DishPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      dishId: this.props.navigation.state.params.dishId,
      dish: {},
      posts: [],
      pressed: false,
    };
    console.log(this.state.dishId);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickDish = this.handleClickDish.bind(this);
    this.updateData = this.updateData.bind(this);
    this.upvote = this.upvote.bind(this);
  }

  handleClickBack() {
    this.props.navigation.goBack();
  }

  handleClickDish(postId){
    this.props.navigation.navigate('ViewPost', {postId});
  }

  upvote(postId){
    if (this.state.pressed === false) {
      this.setState({
        pressed: true
      });
      console.log("user = " + this.props.user);
      network.social.hasUpvoted(postId, this.props.user.userId)
      .then(res => res.text())
      .then(res => {
        console.log(res);
        console.log("=========== hasUpvoted???? ===========");
        console.log("postId = " + postId);
        console.log("userId = " + this.props.user.userId);
        //console.log(res["_bodyText"]);
        if (res == "Not Upvoted") {
          network.social.upvotePost(postId)
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                console.log("=========== UPVOTE ===========");
                console.log("postID = " + postId);
                network.dish.getDishById(this.state.dishId)
                  .then(res => res.json())
                  .then(res => {
                    console.log(res)
                    this.setState({...res, posts: res.posts || [], loading: false})
                  })
                  .catch(err => {
                    console.log(err)
                  });
                // network.social.getPostByPostId(postId)
                //   .then(res => {
                //     console.log(res);
                //     this.props.dispatch({type: "GET_POST_INFO", data: res});
                //   })
                //   .catch(err => {

                //   });
                  
                // console.log("upvoteCount = " + this.props.post.upvoteCount);
                this.setState({
                  pressed: false
                });
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
          network.social.deleteUpvoteOfPost(postId, res)
            .then((res) => {
                console.log(res);
                console.log("=========== DOWNVOTE ===========");
                //console.log("postID = " + this.state.postId);
                network.dish.getDishById(this.state.dishId)
                  .then(res => res.json())
                  .then(res => {
                    console.log(res)
                    this.setState({...res, posts: res.posts || [], loading: false})
                  })
                  .catch(err => {
                    console.log(err)
                  });
                // network.social.getPostByPostId(postId)
                //   .then(res => {
                //     console.log(res);
                //     this.props.dispatch({type: "GET_POST_INFO", data: res});
                //   })
                //   .catch(err => {

                //   });
                // console.log("upvoteCount = " + this.props.post.upvoteCount);
                this.setState({
                  pressed: false
                });
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
  }

  componentDidMount() {
    this.updateData();
  }

  handlePostImage(type) {
    let result;
    if (type === "image") {
      result = ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else {
      result = ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
    result.then((result) => {
      if (!result.cancelled) {
        this.props.navigation.navigate("Post",{
          image:result.uri,
          name: this.state.name,
          restaurantId:this.state.restaurantId,
          callback:this.updateData
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
  async updateData(){
    network.dish.getDishById(this.state.dishId)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({...res, posts: res.posts || [], loading: false})
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
      });
  }
  onDishCreatorPress(userId) {
    this.props.navigation.navigate('User', {userId});
  }

  onRestaurantPress(restaurantId) {
    this.props.navigation.navigate('Restaurant', {restaurantId});
  }

  // onDishPhotoPress(imageUrl) {
  //   this.props.history.push(`/dishphoto/${imageUrl}`);
  // }

  renderPostsOfDish() {
    let photos = this.state.posts.map(item => {
        let image = item.imageUrl || "http://via.placeholder.com/100x100";
        let poster = item.creator;
        let avatar = item.creatorAvater || "http://via.placeholder.com/100x100";
        return (
          <Card key={item.postId} style={styles.card}>
            <CardItem style={styles.image}>
              <TouchableWithoutFeedback onPress={this.handleClickDish.bind(this,item.postId)}>
                <Image source={{cache: 'force-cache', uri: image}} style={{height: 200, width: null, flex: 1}}/>
              </TouchableWithoutFeedback>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Button transparent onPress={this.upvote.bind(this,item.postId)}>
                  <Icon active name="heart"/>
                  <Text>{item.upvoteCount} Likes</Text>
                </Button>
              </Left>
              <Right>
                <TouchableWithoutFeedback onPress={this.onDishCreatorPress.bind(this, item.creatorId)}>
                  <CardItem style={styles.cardItem}>
                    <Thumbnail small source={{cache: 'force-cache', uri: avatar}} style={styles.poster}/>
                    <Text style={{fontSize: 16}}>{poster}</Text>
                  </CardItem>
                </TouchableWithoutFeedback>
              </Right>
            </CardItem>
          </Card>
        )
      }
    );
    return photos;
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Dish</Title>
          </Body>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
          <Content>
            <Card style={styles.card}>
              <Text
                style={styles.dishName}>{this.state.name}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.avgRate}
                containerStyle={{marginTop: 3, alignSelf: "center"}}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                halfStarEnabled
                starSize={15}
              />
              <TouchableWithoutFeedback
                onPress={this.onRestaurantPress.bind(this, this.state.restaurantId)}>
                <Text
                  style={styles.restaurant}>{this.state.restaurantName}</Text>
              </TouchableWithoutFeedback>
            </Card>
            <List>
              {this.renderPostsOfDish()}
            </List>
          </Content>}
        <Fab
          active={this.state.active}
          direction="left"
          style={{backgroundColor: '#5067FF'}}
          containerStyle={{bottom:100}}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="add"/>
          <Button style={{backgroundColor: '#34A34F'}} onPress={this.handlePostImage.bind(this, "image")}>
            <Icon name="ios-images"/>
          </Button>
          <Button style={{backgroundColor: '#3B5998'}} onPress={this.handlePostImage.bind(this, "camera")}>
            <Icon name="ios-camera"/>
          </Button>
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  image: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardItem: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dishName: {
    paddingTop: 10,
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  restaurant: {
    paddingTop: 10,
    marginBottom: 18,
    color: '#0f87f8',
    textAlign: 'center',
  },
  poster: {
    marginRight: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post,
    user: state.user
  }
};

export default connect(
  mapStateToProps
)(DishPage);