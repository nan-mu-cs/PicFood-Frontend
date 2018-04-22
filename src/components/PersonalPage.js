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
    // this.props.history.push("/login");
    this.props.navigation.navigate('Auth');
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
    // this.props.history.push(`/viewpost/${postId}`)
    this.props.navigation.navigate('ViewPost',{postId});
  }

  render() {
    console.log("usertime line!!!");
    console.log(this.props.personTimeline);
    let images = [];
    let post = [];
    for (let i = 0; i < this.props.personTimeline.length; i++) {
      if (this.props.personTimeline[i].creatorId)
        post.push(this.props.personTimeline[i]);
    }
    console.log(post);
    for (let i = 0; i < post.length; i += 3) {
      let card1 = (

          <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i].postId)}>
            <Image source={{cache: 'force-cache', uri: post[i].imageUrl || "http://via.placeholder.com/350x150"}}
                       style={styles.photoItem}/>
          </TouchableWithoutFeedback>

      );
      let card2, card3;
      if (i + 1 < post.length)
        card2 = (

            <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i + 1].postId)}>
              <Image source={{cache: 'force-cache', uri: post[i + 1].imageUrl || "http://via.placeholder.com/350x150"}}
                         style={styles.photoItem}/>
            </TouchableWithoutFeedback>

        );
      if (i + 2 < post.length)
        card3 = (

            <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i + 2].postId)}>
              <Image source={{cache: 'force-cache', uri: post[i + 1].imageUrl || "http://via.placeholder.com/350x150"}}
                         style={styles.photoItem}/>
            </TouchableWithoutFeedback>

        );
      images.push(
        <View style={styles.photoContainer} key={post[i].postId}>
          {card1}
          {card2}
          {card3}
        </View>
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
          <Row size={25} style={{alignItems: "center"}}>
            <Col size={3}>
              <TouchableWithoutFeedback onPress={() => (this.setState({pictureModalShow: true}))}>
                <Thumbnail round size={150}
                           source={{cache: 'force-cache', uri: (this.props.user && this.props.user.avatar) || "http://via.placeholder.com/100x100"}}
                           style={{marginLeft: 30}}/>
              </TouchableWithoutFeedback>
              <ImagePreview visible={this.state.pictureModalShow} source={{uri: (this.props.user.avatar)}} close={() => (this.setState({pictureModalShow: false}))} />

            </Col>
            <Col size={2}>
            </Col>
            <Col size={10}>
              <Row style={{alignItems: "center"}}>
                <Col size={3}>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Followings',{
                      userId:this.props.user.userId
                    })}>
                    <Text>{this.props.user.followCount || 0} following</Text>
                  </TouchableWithoutFeedback>
                </Col>
                <Col size={3}>
                  <TouchableWithoutFeedback
                    onPress={() =>  this.props.navigation.navigate('Followers',{
                      userId:this.props.user.userId
                    })}>
                    <Text>{this.props.user.fanCount || 0} followers</Text>
                  </TouchableWithoutFeedback>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              <Button primary block style={{flex: 1, marginLeft: 15, marginRight: 15}}
                      onPress={() => this.props.navigation.navigate('UserList')}>
                <Text>Add Friends</Text>
              </Button>
            </Col>
          </Row>
          <Row size={10} style={{marginTop: 12}}>
            <Col>
              <Button primary block style={{flex: 1, marginLeft: 15, marginRight: 15}}
                      onPress={() => this.props.navigation.navigate('EditProfile',{userId:this.props.user.userId})}>
                <Text>Edit Profile</Text>
              </Button>
            </Col>
          </Row>
          <Row size={10} style={{marginTop: 12, marginBottom: 10}}>
            <Col>
              <Button danger block style={{flex: 1, marginLeft: 15, marginRight: 15}}
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
        {/*<Footer/>*/}
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
    height: 150,
    margin: 1
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    personTimeline: state.userTimeline
  }
};

export default connect(
  mapStateToProps
)(PersonalPage);