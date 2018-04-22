/**
 * Created by Chaofeng on 18/03/2018.
 */
import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
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
import {connect} from "react-redux";
import StarRating from 'react-native-star-rating';
import network from "../../network";

class DishCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      imageUrl: "",
      avatar: ""
    };
  }

  componentDidMount() {
    network.dish.getDishImages(this.props.data.dishId)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0)
          this.setState({
            imageUrl: data[0]
          });
      }).catch(err => {
      console.log(err);
    });
  }

  onCardPress(dishId) {
    this.props.navigation.navigate("Dish", {
      dishId
    });
  }

  render() {
    let avatar = this.props.data.avatar || "http://via.placeholder.com/100x100";
    return (
      <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, this.props.data.restaurantId)}>
        <Card>
          <CardItem style={styles.cardItem}>
            <Thumbnail source={{cache: 'force-cache', uri: avatar}} style={{height: 100, width: 100}}/>
            <View style={{flex: 1, paddingLeft: 10, justifyContent: 'flex-start',}}>
              <Text>{this.props.data.name}</Text>
              <Text note style={{fontSize: 13}}>{this.props.data.address}</Text>
              <Text note style={{color: 'gray'}}>{this.props.data.category}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.props.data.avgRate}
                containerStyle={{marginTop: 3, alignSelf: "flex-start"}}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                halfStarEnabled
                starSize={15}
              />
            </View>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    let avatar = this.props.data.imageUrl || "http://via.placeholder.com/100x100";
    return (
      <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, this.props.data.dishId)}>
        <Card>
          <CardItem style={styles.cardItem}>
            <View style={{flex: 1, height: 80, paddingRight: 10, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 17, paddingBottom: 5}}>{this.props.data.name}</Text>
              <Text note style={{fontSize: 14, paddingBottom: 5}}>{this.props.data.restaurantName || 'Restaurant Name'}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.props.data.avgRate}
                containerStyle={{marginTop: 3, alignSelf: "flex-start"}}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                halfStarEnabled
                starSize={15}
              />
            </View>
            <Thumbnail source={{cache: 'force-cache', uri: avatar}} style={{height: 100, width: 100}}/>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    // paddingLeft: 10,
    paddingRight: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withNavigation(connect(
  mapStateToProps
)(DishCard));
