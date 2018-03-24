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

class DishCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  onCardPress(dishId) {
    this.props.dispatch({type:"NAVIGATE_TO_DISH_PAGE", data: dishId});
    this.props.history.push(`/dishes/${dishId}`);
  }

  render() {
    return (
      <Card onPress={this.onCardPress.bind(this, this.props.data.id)}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: this.props.data.avatar}}/>
            <Body>
            <Text>{this.props.data.name}</Text>
            <Text note>{this.props.data.restaurant}</Text>
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
          <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, this.props.data.id)}>
            <Image source={{uri: this.props.data.avatar}} style={{height: 200, width: null, flex: 1}}/>
          </TouchableWithoutFeedback>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
  }
};

export default withRouter(connect(
  mapStateToProps
)(DishCard));
