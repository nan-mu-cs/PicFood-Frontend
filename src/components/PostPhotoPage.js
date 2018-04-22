/**
 * Created by kai on 23/03/2018.
 */
import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Input,
  Item,
  Keyboard,
  Label,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import StarRating from 'react-native-star-rating';
import network from "../network";

// import Autocomplete from "react-native-autocomplete-input";

class PostPhotoPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      avatar: "",
      dishname: "",
      rate: 0,
      comment: "",
      category: "",
      image:this.props.navigation.state.params.image,
      restaurantId:this.props.navigation.state.params.restaurantId
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
    //console.log(this.props.location.state.image);
    //let {image} = this.props.location.state;
    // let data  = ["React","Native","Android","Java","Hello World"];
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Post Photo</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>
          <Row size={1}>
            <Col>
              <Item floatingLabel>
                <Label>Dish name</Label>
                <Input value={this.state.dishname} onChangeText={(val) => this.setState({dishname: val})}/>
              </Item>
            </Col>
          </Row>
          <Row size={1} style={{justifyContent: "center", marginTop:20}}>
            <Col>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.rate}
                containerStyle={{alignSelf: "center"}}
                fullStarColor={"#f5af4b"}
                emptyStarColor={"#f5af4b"}
                starSize={25}
                selectedStar={(rate) => this.setState({rate})}
              />
            </Col>
          </Row>
          <Row size={1} style={{justifyContent: "center"}}>
            <Col>
              <Item floatingLabel>
                <Label>Content</Label>
                <Input value={this.state.comment} onChangeText={(val) => this.setState({comment: val})}/>
              </Item>
            </Col>
          </Row>
          <Row size={8}>
            <Col>
              {this.state.image &&
              <Image source={{cache: 'force-cache', uri: this.state.image}} style={{height: 300}}/>}
            </Col>
          </Row>
          <Row size={2}>
            <Col size={2}>
              <Button success block onPress={this.handleClickPost}>
                <Text>Post</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
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