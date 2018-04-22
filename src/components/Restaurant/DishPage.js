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
  Header,
  Text,
  Icon,
  Left,
  Spinner,
  List,
  ListItem,
  Right,
  Title,
  Thumbnail
} from 'native-base';
import {Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import StarRating from 'react-native-star-rating';
import network from '../../network';
import moment from 'moment';

class DishPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      dishId: this.props.navigation.state.params.dishId,
      dish: {},
      posts: []
    };
    console.log(this.state.dishId);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickDish = this.handleClickDish.bind(this);
  }

  handleClickBack() {
    this.props.navigation.goBack();
  }

  handleClickDish(postId){
    this.props.navigation.navigate('ViewPost', {postId});
  }
  componentDidMount() {
    console.log(this.state.dishId);
    network.dish.getDishById(this.state.dishId)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({...res, posts: res.posts || [], loading: false})
      })
      .catch(err => {
        // console.log(err)
      });
  }

  onDishCreatorPress(userId) {
    this.props.navigation.navigate('User', {userId});
  }

  onRestaurantPress(restaurantId) {
    this.props.navigation.navigate('Restaurant', {restaurantId});
  }

  // onDishPhotoPress(imageUrl) {
  //   this.props.history.push(`/dishphoto/${imageUrl}`);
  // }

  renderPostsOfDish() {
    let photos = this.state.posts.map(item => {
        let image = item.imageUrl || "http://via.placeholder.com/100x100";
        let poster = item.creator;
        let avatar = item.creatorAvater || "http://via.placeholder.com/100x100";
        return (
          <Card key={item.postId} style={styles.card}>
            <CardItem style={styles.image}>
              <TouchableWithoutFeedback onPress={this.handleClickDish.bind(this,item.postId)}>
                <Image source={{cache: 'force-cache', uri: image}} style={{height: 200, width: null, flex: 1}}/>
              </TouchableWithoutFeedback>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Button transparent onPress={this.upvote}>
                  <Icon active name="heart"/>
                  <Text>{item.upvoteCount} Likes</Text>
                </Button>
              </Left>
              <Right>
                <TouchableWithoutFeedback onPress={this.onDishCreatorPress.bind(this, item.creatorId)}>
                  <CardItem style={styles.cardItem}>
                    <Thumbnail small source={{cache: 'force-cache', uri: avatar}} style={styles.poster}/>
                    <Text style={{fontSize: 16}}>{poster}</Text>
                  </CardItem>
                </TouchableWithoutFeedback>
              </Right>
            </CardItem>
          </Card>
        )
      }
    );
    return photos;
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Dish</Title>
          </Body>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
          <Content>
            <Card style={styles.card}>
              <Text
                style={styles.dishName}>{this.state.name}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={4.5}
                containerStyle={{marginTop: 3, alignSelf: "center"}}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                halfStarEnabled
                starSize={15}
              />
              <TouchableWithoutFeedback
                onPress={this.onRestaurantPress.bind(this, this.state.restaurantId)}>
                <Text
                  style={styles.restaurant}>{this.state.restaurantName}</Text>
              </TouchableWithoutFeedback>
            </Card>
            <List>
              {this.renderPostsOfDish()}
            </List>
          </Content>}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  image: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardItem: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dishName: {
    paddingTop: 10,
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  restaurant: {
    paddingTop: 10,
    marginBottom: 18,
    color: '#0f87f8',
    textAlign: 'center',
  },
  poster: {
    marginRight: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

export default connect(
  mapStateToProps
)(DishPage);