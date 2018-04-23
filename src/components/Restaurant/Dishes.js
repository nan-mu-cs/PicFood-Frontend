/**
 * Created by jin on 19/03/2018.
 */

import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Card, CardItem, Left,Body, Right,Col,Text} from 'native-base';
import network from "../../network";
import {withNavigation} from 'react-navigation';

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
    this.props.navigation.navigate('Dish',{dishId});
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={this.onDishCardPress.bind(this, this.props.data.dishId)}>
        <Card style={styles.card}>
          <CardItem style={styles.zeroPadding}>
            <Col size = {5}>
              <Image source={{cache: 'force-cache', uri: this.state.imageUrl || "http://via.placeholder.com/100x100"}}
                     style={{height: 80, width: 140}}/>

            </Col>
            <Col size = {8} style={{alignItems: "center"}}>
              <Text style={styles.dish}>{this.props.data.name}</Text>
            </Col>

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
    fontSize: 20,
    textAlign: 'center',
  }
});

export default withNavigation(Dishes);