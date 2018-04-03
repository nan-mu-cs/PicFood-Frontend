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
import network from "../../network";

class CommentCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      dishname: "",
      dishId: ""
    };
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
  }

  handleClickImage() {
    this.props.history.push(`/dishes/${this.props.data.dishId}`)
  }

  handleClickUser() {
    this.props.history.push(`/user/${this.props.data.commenterId}`)
  }

  componentDidMount() {
    network.social.getUserProfile(this.props.data.commenterId)
      .then((res) => res.json())
      .then(data => {
        this.setState({
          avatar: data.avatar,
          name: data.name
        });
        //console.log(data);
      }).catch(err => {
      console.log(err);
    });
    network.post.getPostInfo(this.props.data.postId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          dishname: data.dishName,
          dishId: data.dishId
        });
        console.log(data);
      }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let avatar = this.state.avatar;
    if (!avatar)
      avatar = "http://via.placeholder.com/100x100";
    let name = this.state.name;
    if (!name)
      name = "PlaceHolder Name";
    // console.log(this.props);
    {/*<Card style={{borderColor: "transparent", shadowColor: "transparent"}}>*/}
    return (
      <Card style={{padding: 5}}>
        <CardItem>
          <TouchableWithoutFeedback onPress={this.handleClickUser}>
            <Left>
              <Thumbnail small source={{uri: avatar}}/>
              <Body>
              <Text style={{fontSize: 16}}>{name}</Text>
              {/*<Text note style={{fontSize:14}}>{this.props.data.location}</Text>*/}
              </Body>
            </Left>
          </TouchableWithoutFeedback>
        </CardItem>
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Body style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <Text note><Icon ios="ios-quote" android="quote" style={{fontSize: 15, color: 'blue'}}/> Comment on dish <Text
              style={{marginLeft: 10}}>{this.state.dishname}</Text>:</Text>
            <Text style={{marginTop: 5, marginLeft: 10}}>{this.props.data.content}</Text>
            </Body>
          </TouchableWithoutFeedback>
        </CardItem>
      </Card>
    );
  }
}

export default withRouter(CommentCard);