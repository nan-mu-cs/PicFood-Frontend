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
import {Image, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Dishes from "./Dishes";
import {Col, Grid, Row} from "react-native-easy-grid";
import Footer from "../Footer";
import StarRating from 'react-native-star-rating';
import {ImagePicker} from 'expo';
import network from '../../network';

class RestaurantPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      restaurantId: this.props.match.params.id
    };
    // console.log('RestaurantPage', this.props.match.params.id);
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

  componentDidMount() {
    network.restaurant.getRestaurantInfoById(this.state.restaurantId)
      .then(res => {
        console.log(res);
        this.props.dispatch({type: "GET_RESTAURANT_INFO", data: res});
      })
      .catch(err => {

      })
  }

  render() {
    let dishes = this.props.restaurant.dishes.map((item) => {
      return (
        <ListItem key={item.dishId} style={styles.listItem}>
          <Card>
            <CardItem>
              {item.name}
            </CardItem>
            <CardItem cardBody>
              <TouchableWithoutFeedback onPress={this.onCardPress.bind(this, item.dishId)}>
                <Image source={{uri: item.avatar || "http://via.placeholder.com/100x100"}}
                       style={{height: 100, width: null, flex: 1}}/>
              </TouchableWithoutFeedback>
            </CardItem>
          </Card>
        </ListItem>
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
            {/*<CardItem cardBody>*/}
            {/*<Image source={{uri: this.props.restaurant.avatar}} style={{height: 200, width: null, flex: 1}}/>*/}
            {/*</CardItem>*/}
          </Card>
          <ScrollView>
            <List>
              {dishes}
            </List>
          </ScrollView>
        </Content>
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
        <Footer/>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  dishName: {
    paddingTop: 10,
    textAlign: 'center',
  },
  restaurant: {
    paddingTop: 10,
    fontSize: 17,
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