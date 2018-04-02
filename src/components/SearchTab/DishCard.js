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
        console.log(data);
        if (data && data.length > 0)
          this.setState({
            imageUrl: data[0]
          });
      }).catch(err => {
      console.log(err);
    });
  }

  onCardPress(dishId) {
    this.props.history.push(`/dishes/${dishId}`);
  }

  render() {
    let avatar = this.props.data.avatar || "http://via.placeholder.com/100x100";
    return (
      <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, this.props.data.dishId)}>
        <Card onPress={this.onCardPress.bind(this, this.props.data.dishId)}>
          <CardItem>
            <Left>
              {/*<Thumbnail source={{uri: avatar}}/>*/}
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
            <Image source={{uri: this.state.imageUrl}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withRouter(connect(
  mapStateToProps
)(DishCard));
