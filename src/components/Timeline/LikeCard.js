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
  Text,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { withNavigation } from 'react-navigation';
import network from "../../network";
import moment from 'moment';

class LikeCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
    };
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
  }

  handleClickImage() {
    // this.props.history.push(`/dishes/${this.state.dishId}`)
    this.props.navigation.navigate('Dish',{
      dishId:this.props.data.dishId
    });
  }

  handleClickUser() {
    // this.props.history.push(`/user/${this.props.data.userId}`)
    this.props.navigation.navigate('User',{
      userId:this.props.data.userId
    });
  }

  render() {
    return (
      <Card style={styles.card}>
        <CardItem style={styles.noPaddingCard}>
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
            <Body style={{paddingTop: 10, paddingLeft: 5}}>
            <Text note><Icon name="md-heart" style={{fontSize: 15, color: 'red'}}/> Liked <Text> {this.props.data.posterName}</Text>'s post <Text
              style={{marginLeft: 5}}>{this.props.data.dishName}</Text></Text>
            </Body>
          </TouchableWithoutFeedback>
        </CardItem>
        <Text style={{fontSize: 13, marginTop: 10, textAlign: 'right', color: 'grey'}}>
          {moment(this.props.data.time).fromNow()}
        </Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  noPaddingCard: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  }
});


export default withNavigation(LikeCard);