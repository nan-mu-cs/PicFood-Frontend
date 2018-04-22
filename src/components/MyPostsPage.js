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
  Left,
  Right,
  Thumbnail
} from 'native-base';
import {StyleSheet, ScrollView, Dimensions, Image, View, AsyncStorage, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import network from "../network";
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from "react-native";
// import ImagePreview from 'react-native-image-preview';

class MyPostsPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      pictureModalShow:false,
      userId: this.props.navigation.state.params.userId
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
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

  handleClickImage(postId) {
    this.props.navigation.navigate('ViewPost',{postId});
  }
  handleClickBack() {
    this.props.navigation.goBack();
    // this.props.history.goBack();
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
            <Image source={{cache: 'force-cache', uri: post[i + 2].imageUrl || "http://via.placeholder.com/350x150"}}
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
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>{(this.props.user && this.props.user.name) || "username"}</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>

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
)(MyPostsPage);