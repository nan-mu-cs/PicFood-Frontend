/**
 * Created by kai on 10/03/2018.
 */
import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { withNavigation } from 'react-navigation';
import network from "../../network";
import moment from 'moment';

class CommentCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
    };
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
  }

  handleClickImage() {
    console.log("click");
    console.log(this.props.data);
    console.log(this.props.data.dishId);
    // this.props.history.push(`/dishes/${this.props.data.dishId}`)
    this.props.navigation.navigate('Dish',{
      dishId:this.props.data.dishId
    });
  }

  handleClickUser() {
    // this.props.history.push(`/user/${this.props.data.commenterId}`)
    this.props.navigation.navigate('User',{
      userId:this.props.data.commenterId
    });
  }

  render() {
    // console.log(this.props.data);
    return (
      <Card style={{padding: 5}}>
        <CardItem>
          <TouchableWithoutFeedback onPress={this.handleClickUser}>
            <Left>
              <Thumbnail small source={{cache: 'force-cache', uri: this.props.data.userAvatar || "http://via.placeholder.com/100x100"}}/>
              <Body>
              <Text style={{fontSize: 16}}>{this.props.data.userName}</Text>
              {/*<Text note style={{fontSize:14}}>{this.props.data.location}</Text>*/}
              </Body>
            </Left>
          </TouchableWithoutFeedback>
        </CardItem>
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Body style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <Text note><Icon ios="ios-quote" android="quote" style={{fontSize: 15, color: 'blue'}}/> Comment on
              <Text> {this.props.data.posterName}</Text>'s post <Text
              style={{marginLeft: 10}}>{this.props.data.dishName}</Text> with:</Text>
            <Text style={{marginTop: 5, marginLeft: 10}}>{this.props.data.content}</Text>
            </Body>
          </TouchableWithoutFeedback>
        </CardItem>
        <Text style={{fontSize: 13, marginTop: 10, paddingRight: 10, paddingBottom: 10, textAlign: 'right', color: 'grey'}}>
          {moment(this.props.data.time).fromNow()}
        </Text>
      </Card>
    );
  }
}

export default withNavigation(CommentCard);