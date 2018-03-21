/**
 * Created by Chaofeng on 18/03/2018.
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
import {withRouter} from 'react-router-native';
import {connect} from "react-redux";
import StarRating from 'react-native-star-rating';

class RestaurantCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  handleClickImage = (restaurantId) => {
    this.props.dispatch({type: "NAVIGATE_TO_RESTAURANT_PAGE", data: restaurantId});
    this.props.history.push(`/restaurants/${restaurantId}`);
  }

  render() {
    return (
      <Card onPress={this.handleClickImage}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: this.props.data.avatar}}/>
            <Body>
            <Text>{this.props.data.name}</Text>
            <Text note>{this.props.data.location}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={this.props.data.rate}
              containerStyle={{marginTop: 3, alignSelf: "flex-start"}}
              fullStarColor={"#f5af4b"}
              emptyStarColor={"#f5af4b"}
              halfStarEnabled
              starSize={15}
            />
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Image source={{uri: this.props.data.avatar}} style={{height: 200, width: null, flex: 1}}/>
          </TouchableWithoutFeedback>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withRouter(connect(
  mapStateToProps
)(RestaurantCard));
