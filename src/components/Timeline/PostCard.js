/**
 * Created by kai on 05/03/2018.
 */
import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Body, Card, CardItem, Left, Text, Thumbnail} from 'native-base';
import {withNavigation} from 'react-navigation';
import moment from 'moment';

class PostCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
    this.handleClickRestaurant = this.handleClickRestaurant.bind(this);
  }

  handleClickImage() {
    this.props.navigation.navigate('ViewPost', {
      postId: this.props.data.postId
    });
  }

  handleClickUser() {
    this.props.navigation.navigate('User', {
      userId: this.props.data.creatorId
    });
  }

  handleClickRestaurant() {
    this.props.navigation.navigate('Restaurant', {
      restaurantId: this.props.data.restaurantId
    });
  }

  render() {
    let image = this.props.data.imageUrl || "http://via.placeholder.com/350x150";
    return (
      <Card style={styles.card}>
        <CardItem style={styles.noPaddingCard}>
          <TouchableWithoutFeedback onPress={this.handleClickUser}>
            <Left>
              <Thumbnail small source={{
                cache: 'force-cache',
                uri: this.props.data.userAvatar || "http://via.placeholder.com/100x100"
              }}/>
              <Body>
              <Text style={{fontSize: 16}}>{this.props.data.userName}</Text>
              </Body>
            </Left>
          </TouchableWithoutFeedback>
        </CardItem>
        <TouchableWithoutFeedback onPress={this.handleClickRestaurant}>
          <Text style={{fontSize: 15, color: 'grey', paddingVertical: 10,}}>at {this.props.data.restaurantName}</Text>
        </TouchableWithoutFeedback>
        {
          this.props.data.content !== "" &&
          <CardItem cardBody>
            <Text style={{paddingTop: 10, paddingBottom: 12}}>{this.props.data.content || "this is a content"}</Text>
          </CardItem>
        }
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Image source={{cache: 'force-cache', uri: image}} style={{height: 200, width: null, flex: 1}}/>
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

export default withNavigation(PostCard);