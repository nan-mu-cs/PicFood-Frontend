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

  onCardPress(dishId) {
    this.props.navigation.navigate("Dish", {
      dishId
    });
  }

  render() {
    let avatar = this.props.data.imageUrls.length > 0 && this.props.data.imageUrls[0] || "http://via.placeholder.com/100x100";
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
