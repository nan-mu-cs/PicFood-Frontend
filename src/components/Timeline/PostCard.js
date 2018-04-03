/**
 * Created by kai on 05/03/2018.
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

class ImageCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      avatar: "",
      name: ""
    };
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  handleClickImage() {
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
    this.props.history.push(`/viewpost/${this.props.data.postId}`)
  }

  componentDidMount() {
    network.social.getUserProfile(this.props.data.creatorId)
      .then((res) => res.json())
      .then(data => {
        this.setState({
          avatar: data.avatar,
          name: data.name
        });
        //console.log(data);
      }).catch(err => {
      //console.log(err);
    });

  }

  render() {
    // console.log(this.props);
    let avatar = this.state.avatar;
    if (!avatar)
      avatar = "http://via.placeholder.com/100x100";
    let name = this.state.name;
    if (!name)
      name = "PlaceHolder Name";
    let image = this.props.data.imageUrl;
    if (!image)
      image = "http://via.placeholder.com/350x150";
    return (
      <Card style={{borderColor: "transparent"}}>
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
            <Image source={{uri: image}} style={{height: 200, width: null, flex: 1}}/>
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

export default withRouter(ImageCard);