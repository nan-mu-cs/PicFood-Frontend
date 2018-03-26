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
            postId: this.props.match.params.postId,
            com: "",
            error:false
        };
        this.postComment = this.postComment.bind(this);
        this.upvote = this.upvote.bind(this);
    }

    onBackPress() {
      this.props.history.goBack();
    }

    componentDidMount() {
        console.log(this.state.postId);
          network.social.getPostByPostId(this.state.postId)
            .then(res => {
              console.log(res);
              this.props.dispatch({type: "GET_POST_INFO", data: res});
            })
            .catch(err => {

            })
    }

    upvote() {
              //this.props.dispatch({type: "UPVOTE_POST", data: this.props.post.upvoteCount + 1});
        // network.comment.upvotePost(this.state.postId)
        //   .then(response=>response.json())
        //   .then((res) => {
        //       //res = res.json();
        //       console.log("response = " + res);
        //       console.log("postID = " + this.state.postId);

        //       network.social.getPostByPostId(this.state.postId)
        //         .then(res => {
        //           console.log(res);
        //           this.props.dispatch({type: "GET_POST_INFO", data: res});
        //         })
        //         .catch(err => {

        //         })
        //   })
        //   .catch((e) => {
        //       this.setState({
        //           error:true
        //       });
        //       console.log("ERR"+e.message);
        //   });
    }

    postComment() {
        console.log("66666" + this.state.com);
        console.log(this.state.postId + " ====== " + this.state.com);
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
                        <Thumbnail small source={{uri: avatar}} />
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
                    <Title>{this.props.post.dishName}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
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
                           text: 'Can\'t comment!',
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
        post:state.post
    }
};

export default connect(
    mapStateToProps
)(ViewPost);