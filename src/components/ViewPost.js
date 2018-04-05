/**
 * Created by Xiaoxin on 24/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, Item, Input, ListItem,Left, Body, Toast, Thumbnail,
     Card, CardItem, List, Title, Right } from 'native-base';
import {StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./Footer"
import StarRating from 'react-native-star-rating';
import network from '../network';
import moment from 'moment';

class ViewPost extends Component {
    constructor(props, context){
        super(props);
        this.state={
            creatorId:0,
            postId: this.props.match.params.postId,
            com: "",
            error:false,
            up:false
        };
        this.postComment = this.postComment.bind(this);
        this.upvote = this.upvote.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    onBackPress() {
      this.props.history.goBack();
    }

    componentDidMount() {
        console.log(this.state.postId);
          network.social.getPostByPostId(this.state.postId)
            .then(res => {
              console.log(res);
              this.state.creatorId = res.creatorId;
              this.props.dispatch({type: "GET_POST_INFO", data: res});
            })
            .catch(err => {

            })
    }

    upvote() {
        //this.props.dispatch({type: "UPVOTE_POST", data: this.props.post.upvoteCount + 1});
      console.log("user = " + this.props.user);
      network.social.hasUpvoted(this.state.postId, this.props.user.userId)
      .then(res => {
        console.log(res);
        console.log("=========== hasUpvoted ===========");
        console.log("postId = " + this.state.postId);
        console.log("userId = " + this.props.user.userId);
        console.log(res["_bodyText"]);
        if (res["_bodyText"] == "Not Upvoted")
          network.social.upvotePost(this.state.postId)
            .then(response=>response.json())
            .then((res) => {
                console.log(res);
                console.log("=========== UPVOTE ===========");
                console.log("postID = " + this.state.postId);
            })
            .catch((e) => {
                this.setState({
                    error:true
                });
                console.log("ERR"+e.message);
            });

          else
            network.social.deleteUpvoteOfPost(this.state.postId, res["_bodyText"])
            .catch((e) => {
                this.setState({
                    error:true
                });
                console.log("ERR"+e.message);
            });

          network.social.getPostByPostId(this.state.postId)
          .then(res => {
            console.log(res);
            this.props.dispatch({type: "GET_POST_INFO", data: res});
          })
          .catch(err => {

          });
          console.log("upvoteCount = " + this.props.post.upvoteCount);
        });
    }

    postComment() {
        console.log("66666" + this.state.com);
        console.log(this.state.postId + " ====== " + this.state.com);
        if (!this.state.com) return;
        network.comment.postComment({postId: this.state.postId, content: this.state.com})
          .then(response=>response.json())
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
                  error:true
              });
              console.log("ERR"+e.message);
          });
        this.setState({com:""});
    }
    deletePost() {
      if (this.props.user.userId == this.state.creatorId) {
        network.social.deletePost(this.state.postId)
          .then((res) => {

            console.log(res);
            console.log("=========== Delete ===========");
            console.log("postID = " + this.state.postId);

            this.onBackPress();
          })
          .catch((e) => {
            this.setState({
              error:true
            });
            console.log("ERR"+e.message);
          });
      }
    }

    render() {
        let image = this.props.post.imageUrl;
        if(!image)
          image = "http://via.placeholder.com/100x100";
        console.log(this.props.post);
        let reviews;
        if(this.props.post.comments)
          reviews = this.props.post.comments.map(item => {
            let avatar = item.commenterAvatar;
            if(!avatar)
              avatar = "http://via.placeholder.com/100x100";
            let name = item.commenter;
            if(!name)
              name = "Xiaoxin"
            return (
                <Card key={item.commentId}>
                  <ScrollView>
                  <CardItem>
                    <Left>
                        <Thumbnail small source={{cache: 'force-cache', uri: avatar}} />
                        <Body>
                        <Text style={{fontSize:16}}>{name}</Text>
                        </Body>
                    </Left>
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
                <Header>
                    <Left>
                      <Button transparent onPress={this.onBackPress.bind(this)}>
                        <Icon name='arrow-back'/>
                      </Button>
                    </Left>
                    <Body>
                    <Title>Post</Title>
                    </Body>
                  {this.props.user.userId == this.state.creatorId &&
                    <Right>
                      <Button transparent onPress={this.deletePost}>
                        <Icon name='trash'/>
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
                <Content>
                  <Body>
                    <Text style={{paddingVertical: 12, fontSize: 15}}>{this.props.post.dishName}</Text>
                  </Body>
                  <Card>
                    <CardItem cardBody style = {styles.star}>
                      <Image source={{uri:image}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
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
                          <Icon active name="thumbs-up" />
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
                        <Item rounded style = {styles.comment}>
                          <Input placeholder='Comment...' value={this.state.com} onChangeText={(val)=>this.setState({com:val})}/>
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
                </Content>
                <Footer/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    star: {
        marginBottom:15,
    },
    comment: {
        marginTop:10,
        marginBottom:10,
        marginRight:80,
    }
});


const mapStateToProps = (state, ownProps) => {
    return{
        dish:state.dish,
        post:state.post,
        user:state.user
    }
};

export default connect(
    mapStateToProps
)(ViewPost);