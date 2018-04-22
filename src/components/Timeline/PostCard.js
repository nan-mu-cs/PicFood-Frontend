/**
 * Created by kai on 05/03/2018.
 */
import React, {Component} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
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

class PostCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
    };
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
    this.handleClickRestaurant = this.handleClickRestaurant.bind(this);

  }

  handleClickImage() {
    // this.props.history.push(`/viewpost/${this.props.data.postId}`)
    this.props.navigation.navigate('ViewPost',{
      postId:this.props.data.postId
    });
  }

  handleClickUser() {
    // this.props.history.push(`/user/${this.props.data.creatorId}`)
    this.props.navigation.navigate('User',{
      userId:this.props.data.creatorId
    });
  }

  handleClickRestaurant(){
    this.props.navigation.navigate('Restaurant',{
      restaurantId:this.props.data.restaurantId
    });
  }

  render() {
    // console.log(this.props.data);
    let image = this.props.data.imageUrl || "http://via.placeholder.com/350x150";
    return (
      <Card style={{paddingVertical: 10, paddingHorizontal: 10, marginBottom: 5}}>
        {/*<Card style={{borderColor: "transparent", shadowColor: "transparent"}}>*/}
        <CardItem>
          <TouchableWithoutFeedback onPress={this.handleClickUser}>
            <Left>
              <Thumbnail small source={{cache: 'force-cache', uri: this.props.data.userAvatar || "http://via.placeholder.com/100x100"}}/>
              <Body>
              <Text style={{fontSize: 16}}>{this.props.data.userName}</Text>
              </Body>
            </Left>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.handleClickRestaurant}>
            <Right>
              <Text style={{fontSize:15,color:'grey'}}>At {this.props.data.restaurantName}</Text>
            </Right>
          </TouchableWithoutFeedback>
        </CardItem>
        {
          this.props.data.content !== "" &&
          <CardItem cardBody>
            <Text style={{paddingLeft:20,paddingBottom:10}}>{this.props.data.content||"this is a content"}</Text>
          </CardItem>
        }
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Image source={{cache: 'force-cache', uri: image}} style={{height: 200, width: null, flex: 1}}/>
          </TouchableWithoutFeedback>
        </CardItem>
        <CardItem>
          <Left>
            <Text style={{fontSize:10,color:'grey'}}>
              {moment(this.props.data.time).fromNow()}
            </Text>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export default withNavigation(PostCard);