/**
 * Created by Xiaoxin on 24/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, ListItem,Left, Body,
     Card, CardItem, List, Title, Right } from 'native-base';
import {StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./Footer"
import StarRating from 'react-native-star-rating';
import network from '../network';

class ViewPost extends Component {
    constructor(props, context){
        super(props);
        this.state={
            postId: this.props.match.params.id
        };
    }

    componentDidMount() {
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
        // let comments = this.props.post.map(item => {
        //     return (
        //         <ListItem>
        //               <Text>Comment1</Text>
        //         </ListItem>
        //         <Card key={item.dishId}>
        //           <CardItem>
        //             <Image source={{uri: image}} style={{height: 200, width: null, flex: 1}}/>
        //           </CardItem>
        //           <CardItem>
        //             <Left>
        //               <Button transparent>
        //                 <Icon active name="thumbs-up" />
        //                 <Text>{item.upvoteCount} Likes</Text>
        //               </Button>
        //             </Left>
        //             <Right>
        //               <Text>posted by {item.creator}</Text>
        //             </Right>
        //           </CardItem>
        //         </Card>
        //       )
        // }
        // );
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.post.dishName}</Title>
                    </Body>
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
                      starSize={15}
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
                    <ListItem>
                      <Text>Comment1</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Comment2</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Comment3</Text>
                    </ListItem>
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