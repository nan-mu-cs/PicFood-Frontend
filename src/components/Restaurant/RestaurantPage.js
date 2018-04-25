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
  Right,
  Spinner,
  Text,
  Title
} from 'native-base';
import {StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {ImagePicker} from 'expo';
import network from '../../network';
import Dishes from "./Dishes";

class RestaurantPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      restaurantId: this.props.navigation.state.params.restaurantId,
      restaurant: {
        dishes: []
      }
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handlePostImage(type) {
    let result;
    if (type === "image") { // upload image from local device
      result = ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else { // take picture
      result = ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
    result.then((result) => {
      if (!result.cancelled) {
        this.props.navigation.navigate("Post",{
          image:result.uri,
          restaurantId:this.state.restaurantId,
          callback:this.updateData
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleClickBack() {
    this.props.navigation.goBack();
  }

  async updateData(){ // load from cache if there be
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
  componentDidMount() {
      this.updateData();
  }

  render() {
    let dishes = this.state.restaurant.dishes.map((item) => {
      return (
        <Dishes key={item.dishId} data={item}/>
      );
    });

    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <View style={{flex: 5, justifyContent: 'center'}}>
            <Title style={{color: 'white'}}>{this.state.restaurant.name}</Title>
          </View>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
        <Content>
          <Card style={styles.card}>
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
          <Text style={styles.titleForDishes}>{dishes.length > 0 ? 'Dishes' : 'Add dishes for this restaurant!'}</Text>
            <List>
              {dishes}
            </List>
        </Content>}
        <Fab
            active={this.state.active}
            direction="left"
            style={{backgroundColor: '#5067FF'}}
            containerStyle={{bottom:21}}
            position="bottomRight"
            onPress={() => this.setState({active: !this.state.active})}>
          <Icon style={{color: 'white'}} name="add"/>
          <Button style={{backgroundColor: '#34A34F'}} onPress={this.handlePostImage.bind(this, "image")}>
            <Icon style={{color: 'white'}} name="ios-images"/>
          </Button>
          <Button style={{backgroundColor: '#3B5998'}} onPress={this.handlePostImage.bind(this, "camera")}>
            <Icon style={{color: 'white'}} name="ios-camera"/>
          </Button>
        </Fab>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
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