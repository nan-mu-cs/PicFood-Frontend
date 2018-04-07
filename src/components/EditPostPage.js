/**
 * Created by jin on 05/04/2018.
 */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  FooterTab,
  Keyboard,
  Button,
  Text,
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Fab,
  Left,
  Right,
  Item,
  Input,
  Label
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import StarRating from 'react-native-star-rating';
import network from "../network";

// import Autocomplete from "react-native-autocomplete-input";

class EditPostPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      postId: this.props.navigation.state.params.postId,
      image:"",
      restaurantId:"",
      content:"",
      dishname: "",
      rate: 0,
      image:this.props.navigation.state.params.image
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
  }
  componentWillMount() {
    network.social.getPostByPostId(this.state.postId)
      .then(res => {

        this.setState({rate: res.rate});
        this.setState({dishname: res.dishName});
        this.setState({content: res.content});
        this.setState({restaurantId: res.restaurantId});
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    network.storage.uploadFile(this.state.image)
      .then((response) => response.text())
      .then(url => {
        this.setState({image: url});
      }).catch(err => {
      console.log(err);
    });
  }
  handleClickBack() {
    // this.props.history.goBack();
    this.props.navigation.goBack();
  }

  handleClickPost() {
    console.log(this.state);
    network.social.addPost({
      restaurantId: this.state.restaurantId,
      dishName: this.state.dishname,
      rate: this.state.rate,
      content: this.state.content,
      imageUrl: this.state.image
    }).then(res => res.json())
      .then(async (data) => {

        network.social.deletePost(this.state.postId)
          .then((res) => {

            console.log(res);
            console.log("=========== Delete ===========");
            console.log("postID = " + this.state.postId);

          })
          .catch((e) => {
            this.setState({
              error:true
            });
            console.log("ERR"+e.message);
          });
      }).catch(err => {
      console.log(err);
    });
    this.props.history.push(`/users`)
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Edit Post</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>
          <Row size={1}>
            <Col>
              <Item floatingLabel>
                <Label>Dish Name</Label>
                <Input value={this.state.dishname} onChangeText={(val) => this.setState({dishname: val})}/>
              </Item>
            </Col>
          </Row>
          <Row size={1} style={{justifyContent: "center"}}>
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
                <Input value={this.state.content} onChangeText={(val) => this.setState({content: val})}/>
              </Item>
            </Col>
          </Row>
          <Row size={8}>
            <Col>
              <Image source={{uri: this.state.image}} style={{height: 300}}/>
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
)(EditPostPage);