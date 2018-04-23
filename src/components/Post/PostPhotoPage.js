/**
 * Created by kai on 23/03/2018.
 */
import React, {Component} from 'react';
import {
  Body,
  Button,
  Container, Content,
  Header,
  Icon,
  Input,
  Item,
  Keyboard,
  Label,
  Left,
  Right,
  Text, Textarea,
  Title
} from 'native-base';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import StarRating from 'react-native-star-rating';
import network from "../../network/index";

// import Autocomplete from "react-native-autocomplete-input";

class PostPhotoPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      avatar: "",
      dishname: this.props.navigation.state.params.name,
      rate: 0,
      comment: "",
      category: "",
      image: this.props.navigation.state.params.image,
      restaurantId: this.props.navigation.state.params.restaurantId
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
  }

  handleClickBack() {
    // console.log(this.props.navigation.state.params);
    this.props.navigation.goBack();
  }

  handleClickPost() {
    // console.log(this.state);
    network.social.addPost({
      restaurantId: this.state.restaurantId,
      dishName: this.state.dishname,
      rate: this.state.rate,
      content: this.state.comment,
      imageUrl: this.state.avatar
    }).then(res => res.json())
      .then(async (data) => {
        let restaurantInfo = await network.restaurant.getRestaurantInfoById(this.state.restaurantId);
        let restaurantDishes = await network.restaurant.getRestaurantDishesById(this.state.restaurantId);
        restaurantInfo.dishes = restaurantDishes;
        console.log(restaurantInfo);
        this.props.dispatch({
          type: "GET_RESTAURANT_INFO",
          restaurantId: restaurantInfo.restaurantId,
          data: restaurantInfo
        });
        this.props.navigation.state.params.callback();
        this.props.navigation.goBack();
      }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    network.storage.uploadFile(this.state.image)
      .then((response) => response.text())
      .then(url => {
        this.setState({avatar: url});
      }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Post Photo</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={{marginHorizontal: 50, marginTop: 30}}>
            {this.state.image &&
            <Image source={{cache: 'force-cache', uri: this.state.image}}
                   style={{height: 270, width: 270, alignSelf: 'center'}}/>}
            <View style={{marginTop: 15, marginBottom: 18}}>
              <Item floatingLabel>
              <Label>Dish name</Label>
              <Input value={this.state.dishname} onChangeText={(val) => this.setState({dishname: val})}/>
            </Item>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 15, marginLeft: 3, color: '#666'}}>Rating</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.rate}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                starSize={25}
                selectedStar={(rate) => this.setState({rate})}
              />
            </View>
            <View style={{marginTop: 15, marginBottom: 30}}>
              <Textarea rowSpan={3} bordered placeholder="Comment"
                        value={this.state.comment} onChangeText={(val) => this.setState({comment: val})}/>
            </View>
            <Button success block onPress={this.handleClickPost}>
              <Text>Post</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps
)(PostPhotoPage);