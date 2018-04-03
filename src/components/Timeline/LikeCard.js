/**
 * Created by kai on 10/03/2018.
 */
import React, {Component} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  Text,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import {withRouter} from 'react-router-native';
import network from "../../network";

class LikeCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      dishname: "",
      dishId: ""
    };
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  handleClickImage() {
    this.props.history.push(`/dishes/${this.state.dishId}`)
    //console.log("click");
    // this.props.history.push({
    //     pathname: "/image-detail",
    //     state:{
    //         avatar:this.props.data.avatar,
    //         user:this.props.data.user,
    //         location:this.props.data.location,
    //         image:this.props.data.image,
    //         comments: this.props.data.comments
    //     }
    // });
  }

  componentDidMount() {
    network.social.getUserProfile(this.props.data.userId)
      .then((res) => res.json())
      .then(data => {
        this.setState({
          avatar: data.avatar,
          name: data.name
        });
        console.log(data);
      }).catch(err => {
      //console.log(err);
    });
    network.post.getPostInfo(this.props.data.postId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          dishname: data.dishName,
          dishId: data.dishId
        });
        //console.log(data);
      }).catch(err => {
      //console.log(err);
    });
    // network.dish.getDishInfoById({id:this.props.data.dishId})
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //     }).catch(err=>{
    //     console.log(err);
    // })
  }

  render() {
    let avatar = this.state.avatar;
    if (!avatar)
      avatar = "http://via.placeholder.com/100x100";
    let name = this.state.name;
    if (!name)
      name = "PlaceHolder Name";
    // console.log(this.props);
    return (
      <Card style={{marginBottom: 5}}>
      {/*<Card style={{borderColor: "transparent", shadowColor: "transparent"}}>*/}
        <CardItem>
          <Left>
            <Thumbnail small source={{uri: avatar}}/>
            <Body>
            <Text style={{fontSize: 16}}>{name}</Text>
            {/*<Text note style={{fontSize:14}}>{this.props.data.location}</Text>*/}
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Body style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <Text note><Icon name="md-heart" style={{fontSize: 15, color: 'red'}}/> Liked dish <Text
              style={{marginLeft: 5}}>{this.state.dishname}</Text></Text>
            </Body>
          </TouchableWithoutFeedback>
        </CardItem>
        {/*<CardItem>*/}
        {/*<Left>*/}
        {/*<Button transparent>*/}
        {/*<Icon active name="thumbs-up" />*/}
        {/*<Text>{this.props.data.likes}</Text>*/}
        {/*</Button>*/}
        {/*</Left>*/}
        {/*<Body>*/}
        {/*<Button transparent>*/}
        {/*<Icon active name="chatbubbles" />*/}
        {/*<Text>{this.props.data.comments.length}</Text>*/}
        {/*</Button>*/}
        {/*</Body>*/}
        {/*<Right>*/}
        {/*<Text>{this.props.data.time}</Text>*/}
        {/*</Right>*/}
        {/*</CardItem>*/}
      </Card>
    );
  }
}

export default withRouter(LikeCard);