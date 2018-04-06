/**
 * Created by jin on 19/03/2018.
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
  Right,
  List,
  ListItem
} from 'native-base';
import network from "../../network";
import { withNavigation } from 'react-navigation';

class Dishes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imageUrl: ""
    }
  }

  componentDidMount() {
    network.dish.getDishImages(this.props.data.dishId)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data && data.length > 0)
          this.setState({
            imageUrl: data[0]
          });
      }).catch(err => {
      console.log(err);
    });
  }

  onDishCardPress(dishId) {
    // this.props.history.push(`/dishes/${dishId}`);
    this.props.navigation.navigate('Dishes',{dishId});
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={this.onDishCardPress.bind(this, this.props.data.dishId)}>
        <Card style={styles.card}>
          <CardItem style={styles.zeroPadding}>
            <Left>
              <Image source={{cache: 'force-cache', uri: this.state.imageUrl || "http://via.placeholder.com/100x100"}}
                     style={{height: 60, width: 60}}/>
              <Text>{this.props.data.name}</Text>
            </Left>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  zeroPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
  },
  listItem: {
    borderColor: "transparent"
  },
  dish: {
    fontSize: 17,
    textAlign: 'center',
  }
});

export default withNavigation(Dishes);