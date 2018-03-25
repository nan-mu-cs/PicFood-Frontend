/**
 * Created by jin on 19/03/2018.
 */

import React, {Component} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Spinner,
  Right,
  Text,
  Title
} from 'native-base';
import {Image, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import StarRating from 'react-native-star-rating';
import {ImagePicker} from 'expo';
import network from '../../network';

class RestaurantPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      restaurantId: this.props.match.params.id,
      restaurant: {
        dishes: []
      }
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    // this.handlePostImage = this.handlePostImage.bind(this);
  }

  handlePostImage(type) {
    let result;
    if (type === "image") {
      result = ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else {
      result = ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
    result.then((result) => {
      // console.log(result);
      if (!result.cancelled) {
        this.props.history.push({
          pathname: "/post",
          state: {
            image: result.uri,
            restaurantId: this.state.restaurantId
          }
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleClickBack() {
    this.props.history.goBack();
  }

  onDishCardPress(dishId) {
    this.props.history.push(`/dishes/${dishId}`);
  }

  async componentDidMount() {
    let cache = this.props.cachedRestaurants[this.state.restaurantId];
    if(cache) {
      this.setState({loading: false, restaurant: cache});
      return;
    }
    try {
      let restaurantInfo = await network.restaurant.getRestaurantInfoById(this.state.restaurantId);
      let restaurantDishes = await network.restaurant.getRestaurantDishesById(this.state.restaurantId);
      restaurantInfo.dishes = restaurantDishes;
      this.props.dispatch({type: "GET_RESTAURANT_INFO", restaurantId: restaurantInfo.restaurantId, data: restaurantInfo});
      this.setState({loading: false, restaurant: restaurantInfo});
    } catch(e) {
    }
  }

  render() {
    let dishes = this.state.restaurant.dishes.map((item) => {
      return (
        <Card key={item.dishId} onPress={this.onDishCardPress.bind(this, item.dishId)}>
          <CardItem>
            <Text>{item.name}</Text>
          </CardItem>
          <CardItem>
            <TouchableWithoutFeedback onPress={this.onDishCardPress.bind(this, item.dishId)}>
              <Image source={{uri: item.avatar || "http://via.placeholder.com/100x100"}} style={{height: 200, width: null, flex: 1}}/>
            </TouchableWithoutFeedback>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Restaurant</Title>
          </Body>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner/></Content> :
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                <Text style={styles.restaurant}>{this.state.restaurant.name}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.restaurant.avgRate}
                  containerStyle={{marginTop: 10, alignSelf: "center"}}
                  fullStarColor={"#f5af4b"}
                  emptyStarColor={"#f5af4b"}
                  halfStarEnabled
                  starSize={15}
                />
                <Text note>{this.state.restaurant.location}</Text>
                <Text note>{this.state.restaurant.address}</Text>
                <Text note>{this.state.restaurant.teleNumber}</Text>
                <Text note>{this.state.restaurant.category}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Text style={styles.titleForDishes}>Dishes</Text>
          {dishes}
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => this.setState({active: !this.state.active})}>
            <Icon name="add"/>
            <Button style={{backgroundColor: '#34A34F'}} onPress={this.handlePostImage.bind(this, "image")}>
              <Icon name="ios-images"/>
            </Button>
            <Button style={{backgroundColor: '#3B5998'}} onPress={this.handlePostImage.bind(this, "camera")}>
              <Icon name="ios-camera"/>
            </Button>
          </Fab>
        </Content>}
        <Footer/>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  titleForDishes: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    textAlign: 'center',
  },
  restaurant: {
    paddingTop: 10,
    fontSize: 19,
    textAlign: 'center',
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    cachedRestaurants: state.cachedRestaurants
  }
};

export default connect(
  mapStateToProps
)(RestaurantPage);