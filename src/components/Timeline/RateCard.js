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
  Icon,
  Text,
  Button,
  Left,
  Body,
  Right
} from 'native-base';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

class RateCard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  render() {
    // console.log(this.props);
    return (
      <Card style={{borderColor: "transparent", shadowColor: "transparent"}}>
        <CardItem>
          <Left>
            <Thumbnail small source={{cache: 'force-cache', uri: this.props.data.avatar}}/>
            <Body>
            <Text style={{fontSize: 16}}>{this.props.data.user}</Text>
            <Text note style={{fontSize: 14}}>{this.props.data.location}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <TouchableWithoutFeedback onPress={this.handleClickImage}>
            <Body style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <Text note><Icon style={{color: 'white'}} name="md-star" style={{fontSize: 15}}/> Rate on dish <Text
              style={{marginLeft: 5}}>{this.props.data.dish}</Text>:</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={this.props.data.rate}
              containerStyle={{marginTop: 10, alignSelf: "center"}}
              fullStarColor={"#f5af4b"}
              emptyStarColor={"#f5af4b"}
              halfStarEnabled
              starSize={25}
            />
            </Body>
          </TouchableWithoutFeedback>
        </CardItem>
        <CardItem>
          <Left>
            <Text style={{fontSize:10,color:'grey'}}>
              {moment(this.props.data.time).fromNow()}
            </Text>
          </Left>
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

export default RateCard;