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
import Dishes from "./Dishes";

class RestaurantPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      restaurantId: this.props.match.params.id
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



  async componentDidMount() {
    try {
      let restaurantInfo = await network.restaurant.getRestaurantInfoById(this.state.restaurantId);
      let restaurantDishes = await network.restaurant.getRestaurantDishesById(this.state.restaurantId);
      restaurantInfo.dishes = restaurantDishes;
      this.props.dispatch({type: "GET_RESTAURANT_INFO", data: restaurantInfo});
    } catch(e) {
    }
  }

  render() {
    //console.log(this.props.restaurant.dishes);
    let dishes = this.props.restaurant.dishes.map((item) => {
      return (
        <Dishes key={item.dishId} data={item}/>
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
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                <Text style={styles.restaurant}>{this.props.restaurant.name}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.props.restaurant.avgRate}
                  containerStyle={{marginTop: 10, alignSelf: "center"}}
                  fullStarColor={"#f5af4b"}
                  emptyStarColor={"#f5af4b"}
                  halfStarEnabled
                  starSize={15}
                />
                <Text note>{this.props.restaurant.location}</Text>
                <Text note>{this.props.restaurant.address}</Text>
                <Text note>{this.props.restaurant.teleNumber}</Text>
                <Text note>{this.props.restaurant.category}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Text style={styles.titleForDishes}>Dishes</Text>
            <List>
                {dishes}
            </List>
        </Content>
        <Footer/>
        <Fab
            active={this.state.active}
            direction="left"
            style={{backgroundColor: '#5067FF'}}
            containerStyle={{bottom:100}}
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
    restaurant: state.restaurant
  }
};

export default connect(
  mapStateToProps
)(RestaurantPage);