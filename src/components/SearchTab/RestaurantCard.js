/**
 * Created by Chaofeng on 18/03/2018.
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
  Right, View
} from 'native-base';
import { withNavigation } from 'react-navigation';
import {connect} from "react-redux";
import StarRating from 'react-native-star-rating';

class RestaurantCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  onCardPress(restaurantId) {
    this.props.navigation.navigate("Restaurant",{
      restaurantId
    });
  }

  render() {
    let avatar = this.props.data.avatar || "http://via.placeholder.com/100x100";
    return (
      <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, this.props.data.restaurantId)}>
        <Card>
          <CardItem style={styles.cardItem}>
            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10, justifyContent: 'flex-start',}}>
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
            <Thumbnail source={{cache: 'force-cache', uri: avatar}} style={{height: 100, width: 100}}/>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withNavigation(connect(
  mapStateToProps
)(RestaurantCard));
