/**
 * Created by Xiaoxin on 24/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, ListItem,Left, Body, Thumbnail,
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
            postId: this.props.match.params.postId
        };
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
                    <CardItem cardBody>
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
                        <Button transparent>
                          <Icon active name="thumbs-up" />
                          <Text>{this.props.post.upvoteCount} Likes</Text>
                        </Button>
                      </Left>
                      <Right>
                        <Text>{this.props.post.restaurantName}</Text>
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