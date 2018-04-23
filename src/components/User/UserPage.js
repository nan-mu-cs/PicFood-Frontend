/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, {Component} from 'react';
import {
  Body, Button, Container, Content, Header, Icon, Left, Right, Spinner, Text, Thumbnail,
  Title
} from 'native-base';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import network from "../../network";
import ImageViewer from 'react-native-image-zoom-viewer';

// import ImagePreview from 'react-native-image-preview';

class UserPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      userId: this.props.navigation.state.params.userId,
      name: '',
      avatar: "http://via.placeholder.com/100x100",
      pictureModalShow: false,
      followCount:0,
      fanCount:0
    };
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickBack() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    network.social.getUserProfile(this.state.userId)
      .then(res => res.json())
      .then(data => {
        this.setState(data);
        // this.props.dispatch({type:"UPDATE_USER_PROFILE",data:data});
        network.account.getUserTimeline(data.userId)
          .then(res => res.json())
          .then(data => {
            this.setState({loading: false})
            this.props.dispatch({type: "UPDATE_OTHERUSER_TIMELINE", data: data});
          }).catch(err => {
          console.log(err);
        })
      }).then(err => {
      console.log(err);
    });
  }

  handleClickImage(postId) {
    this.props.navigation.navigate('ViewPost', {postId});
  }

  render() {
    console.log("usertime line!!!");
    console.log(this.props);
    let images = [];
    let post = [];
    for (let i = 0; i < this.props.otherUserTimeline.length; i++) {
      if (this.props.otherUserTimeline[i].creatorId)
        post.push(this.props.otherUserTimeline[i]);
    }
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
              <Image source={{
                cache: 'force-cache',
                uri: post[i + 1].imageUrl || "http://via.placeholder.com/350x150"
              }} style={styles.photoItem}/>
            </TouchableWithoutFeedback>

        );
      if (i + 2 < post.length)
        card3 = (

            <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this, post[i + 2].postId)}>
              <Image source={{
                cache: 'force-cache',
                uri: post[i + 2].imageUrl || "http://via.placeholder.com/350x150"
              }} style={styles.photoItem}/>
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
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <View style={{flex: 5, justifyContent: 'center'}}>
            <Title style={{color: 'white'}}>{this.state.name}</Title>
          </View>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
        <Grid>
          <Row size={15} style={{alignItems: "center"}}>
            <Col size={3}>
              <TouchableWithoutFeedback onPress={() => (this.setState({pictureModalShow: true}))}>
                <Thumbnail round size={150} source={{
                  cache: 'force-cache',
                  uri: (this.state.avatar) || "http://via.placeholder.com/100x100"
                }} style={{marginLeft: 30}}/>
              </TouchableWithoutFeedback>
              <Modal visible={this.state.pictureModalShow} transparent={true} >
                <ImageViewer imageUrls={[{url:this.state.avatar}]} enableImageZoom={true} onCancel={() => (this.setState({pictureModalShow: false}))}  onClick={() => (this.setState({pictureModalShow: false}))} />
              </Modal>
              {/*<ImagePreview visible={this.state.pictureModalShow} source={{uri: (this.state.avatar)}}*/}
                            {/*close={() => (this.setState({pictureModalShow: false}))}/>*/}
            </Col>
            <Col size={1}>
            </Col>
            <Col size={8}>
              <Row style={{alignItems: "center"}}>
                <Col size={4} style={{alignItems: "center"}}>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Followings',{
                      userId:this.state.userId
                    })}>
                    <Text style={{fontWeight:'bold', fontSize:30}}>{this.state.followCount || 0}</Text>
                  </TouchableWithoutFeedback>
                  <Text>following</Text>
                </Col>
                <Col size={4} style={{alignItems: "center"}}>
                  <TouchableWithoutFeedback
                    onPress={() =>  this.props.navigation.navigate('Followers',{
                      userId:this.state.userId
                    })}>

                    <Text style={{fontWeight:'bold', fontSize:30}}>{this.state.fanCount || 0} </Text>
                  </TouchableWithoutFeedback>
                  <Text>followers</Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row size={85}>
            <Col>
              <ScrollView>
                {images}
              </ScrollView>
            </Col>
          </Row>
        </Grid>}
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
    otherUserTimeline: state.otherUserTimeline
  }
};

export default connect(
  mapStateToProps
)(UserPage);