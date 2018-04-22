/**
 * Created by kai on 07/03/2018.
 */
import React, {Component} from 'react';

import {Body, Button, Container, Header, Text, Thumbnail, Title} from 'native-base';
import {AsyncStorage, Modal, StatusBar, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import ImageViewer from 'react-native-image-zoom-viewer';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

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
          <Row size={15} style={{alignItems: "center"}}>
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
            <Col style={{alignItems: "center"}}>
              <AwesomeButtonRick type="primary" height= {70} width={280}
                      onPress={() => this.props.navigation.navigate('UserList')}>
                <Text>Add Friends</Text>
              </AwesomeButtonRick>
            </Col>
          </Row>
          <Row size={10} style={{marginTop: 6}}>
            <Col style={{alignItems: "center"}}>
              <AwesomeButtonRick type="secondary" height= {70} width={280}
                      onPress={() => this.props.navigation.navigate('EditProfile',{userId:this.props.user.userId})}>
                <Text>Edit Profile</Text>
              </AwesomeButtonRick>
            </Col>
          </Row>
          <Row size={10} style={{marginTop: 6}}>
            <Col style={{alignItems: "center"}}>
              <AwesomeButtonRick type="anchor" height= {70} width={280}
                      onPress={() => this.props.navigation.navigate('MyPosts',{userId:this.props.user.userId})}>
                <Text>My Posts</Text>
              </AwesomeButtonRick>
            </Col>
          </Row>
          <Row size={10} style={{marginTop: 6, marginBottom: 100}}>
            <Col style={{alignItems: "center"}}>
              <AwesomeButtonRick backgroundColor='#d35058' backgroundDarker="#ff7fbe" height= {70} width={280}
                      onPress={() => this.handleLogout()}>
                <Text>Logout</Text>
              </AwesomeButtonRick>
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