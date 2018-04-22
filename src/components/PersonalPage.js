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
import {
  StyleSheet, ScrollView, Dimensions, Image, View, AsyncStorage, TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import ImageCard from "./Timeline/PostCard";
import Footer from "./Footer";
import {Col, Row, Grid} from "react-native-easy-grid";
import network from "../network";
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from "react-native";

class PersonalPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      pictureModalShow:false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // this.props.history.push("/login");
    this.props.navigation.navigate('Auth');
    AsyncStorage.clear();
    this.props.dispatch({type: "LOGOUT"});
  }


  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar backgroundColor="blue" barStyle="light-content"/>
          <Body>
          <Title style={{color: 'white'}}>{(this.props.user && this.props.user.name) || "username"}</Title>
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
              {/*<ImagePreview visible={this.state.pictureModalShow} source={{uri: (this.props.user.avatar)}} close={() => (this.setState({pictureModalShow: false}))} />*/}
              <Modal visible={this.state.pictureModalShow} transparent={true} >
                <ImageViewer imageUrls={[{url:this.props.user.avatar}]} enableImageZoom={true} onCancel={() => (this.setState({pictureModalShow: false}))}  onClick={() => (this.setState({pictureModalShow: false}))} />
              </Modal>
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
          <Row size={10} style={{marginTop: 12}}>
            <Col>
              <Button primary block style={{flex: 1, marginLeft: 15, marginRight: 15}}
                      onPress={() => this.props.navigation.navigate('MyPosts',{userId:this.props.user.userId})}>
                <Text>My Posts</Text>
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
        </Grid>
        {/*<Footer/>*/}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
};

export default connect(
  mapStateToProps
)(PersonalPage);