/**
 * Created by kai on 07/03/2018.
 */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  FooterTab,
  Button,
  Text,
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import {StyleSheet, ScrollView, Dimensions, Image, View, AsyncStorage, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import ImageCard from "./Timeline/PostCard";
import Footer from "./Footer";
import {withRouter} from 'react-router-native';
import {Col, Row, Grid} from "react-native-easy-grid";
import network from "../network";
import ImagePreview from 'react-native-image-preview';

class PersonalPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      pictureModalShow:false
    };
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    network.account.getUserTimeline(this.props.user.userId)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({type: "UPDATE_USER_TIMELINE", data: data});
        // console.log("get time line");
        console.log(data);
      }).catch(err => {
      console.log(err);
    })
  }

  handleLogout() {
    this.props.history.push("/login");
    AsyncStorage.clear();
    this.props.dispatch({type: "LOGOUT"});
  }

  handleClickImage(postId) {
    // console.log("click");
    // this.props.history.push({
    //     pathname: "/image-detail",
    //     state:{
    //         avatar:this.props.user.avatar,
    //         user:this.props.user.name,
    //         location:item.location,
    //         image:item.image,
    //         comments: item.comments
    //     }
    // });
    this.props.history.push(`/viewpost/${postId}`)
  }

  render() {
    console.log("usertime line!!!");
    console.log(this.props.userTimeline);
    let images = [];
    let post = [];
    for (let i = 0; i < this.props.userTimeline.length; i++) {
      if (this.props.userTimeline[i].creatorId)
        post.push(this.props.userTimeline[i]);
    }
    console.log(post);
    for (let i = 0; i < post.length; i += 3) {
      let card1 = (
        <Col>
          <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i].postId)}>
            <Thumbnail square source={{cache: 'force-cache', uri: post[i].imageUrl || "http://via.placeholder.com/350x150"}}
                       style={styles.photoItem}/>
          </TouchableWithoutFeedback>
        </Col>
      );
      let card2, card3;
      if (i + 1 < post.length)
        card2 = (
          <Col>
            <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i + 1].postId)}>
              <Thumbnail square source={{cache: 'force-cache', uri: post[i + 1].imageUrl || "http://via.placeholder.com/350x150"}}
                         style={styles.photoItem}/>
            </TouchableWithoutFeedback>
          </Col>
        );
      if (i + 2 < post.length)
        card3 = (
          <Col>
            <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i + 2].postId)}>
              <Thumbnail square source={{cache: 'force-cache', uri: post[i + 1].imageUrl || "http://via.placeholder.com/350x150"}}
                         style={styles.photoItem}/>
            </TouchableWithoutFeedback>
          </Col>
        );
      images.push(
        <Row style={{height: 150}} key={post[i].postId}>
          {card1}
          {card2}
          {card3}
        </Row>
      );
    }
    // console.log(this.props);
    return (
      <Container>
        <Header>
          <Body>
          <Title>{(this.props.user && this.props.user.name) || "username"}</Title>
          </Body>
        </Header>
        <Grid>
          <Row size={15} style={{alignItems: "center"}}>
            <Col size={3}>
              <TouchableWithoutFeedback onPress={() => (this.setState({pictureModalShow: true}))}>
                <Thumbnail round size={150}
                           source={{cache: 'force-cache', uri: (this.props.user && this.props.user.avatar) || "http://via.placeholder.com/100x100"}}
                           style={{marginLeft: 30}}/>
              </TouchableWithoutFeedback>
              <ImagePreview visible={this.state.pictureModalShow} source={{uri: (this.props.user.avatar)}} close={() => (this.setState({pictureModalShow: false}))} />

            </Col>
            <Col size={7}>
              <Row style={{alignItems: "center"}}>
                <Col size={3}>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.history.push(`/followings/${this.props.user.userId}`)}>
                    <Text>{this.props.user.followCount || 0} following</Text>
                  </TouchableWithoutFeedback>
                </Col>
                <Col size={3}>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.history.push(`/followers/${this.props.user.userId}`)}>
                    <Text>{this.props.user.fanCount || 0} followers</Text>
                  </TouchableWithoutFeedback>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row size={7}>
            <Col>
              <Button primary block style={{flex: 1, marginLeft: 5, marginRight: 5}}
                      onPress={() => this.props.history.push("/userlist")}>
                <Text>Add Friends</Text>
              </Button>
            </Col>
          </Row>
          <Row size={7} style={{marginTop: 10}}>
            <Col>
              <Button primary block style={{flex: 1, marginLeft: 5, marginRight: 5}}
                      onPress={() => this.props.history.push("/editprofile")}>
                <Text>Edit Profile</Text>
              </Button>
            </Col>
          </Row>
          <Row size={7} style={{marginTop: 10, marginBottom: 10}}>
            <Col>
              <Button success block style={{flex: 1, marginLeft: 5, marginRight: 5}}
                      onPress={() => this.handleLogout()}>
                <Text>Logout</Text>
              </Button>
            </Col>
          </Row>
          <Row size={85}>
            <Col>
              <ScrollView>
                {images}
              </ScrollView>
            </Col>
          </Row>
        </Grid>
        <Footer/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {},
  photoContainer: {
    flexDirection: "row",
    flex: 1,
    width: Dimensions.get('window').width
  },
  photoItem: {
    width: Dimensions.get('window').width / 3.1,
    height: 100,
    flex: 1,
    margin: 1
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    userTimeline: state.userTimeline
  }
};

export default withRouter(connect(
  mapStateToProps
)(PersonalPage));