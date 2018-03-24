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
    this.handlePostImage = this.handlePostImage.bind(this);
  }

  handlePostImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }).then((result) => {
      // console.log(result);
      if (!result.cancelled) {
        this.props.history.push({
          pathname: "/post",
          state: {
            image: result.uri
          }
        });
      }
    }).catch(err => {

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
    let dish = this.props.restaurant.dishes.map((item) => {
      let dishes;

      dishes = <Dishes data={item}/>;
      return (
        <ListItem key={item.id} style={styles.listItem}>
          {dishes}
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
        <Grid>
          <Row size={9}>
            <Col>
              <ScrollView>
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

                  <CardItem>
                    <ScrollView>
                      <List>
                        {dish}
                      </List>
                    </ScrollView>
                  </CardItem>

                </Card>
              </ScrollView>
            </Col>
          </Row>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => this.setState({active: !this.state.active})}>
            <Icon name="add"/>
            <Button style={{backgroundColor: '#34A34F'}} onPress={this.handlePostImage}>
              <Icon name="ios-images"/>
            </Button>
            <Button style={{backgroundColor: '#3B5998'}}>
              <Icon name="ios-camera"/>
            </Button>
          </Fab>
        </Grid>
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