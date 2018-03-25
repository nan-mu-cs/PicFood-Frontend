/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, {Component} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  Spinner,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer"
import network from "../../network/index";

class UserPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      userId: this.props.match.params.id
    };
  }

  onFollowingsPress() {
    this.props.history.push(`/followings/${this.state.userId}`);
  }

  onFollowersPress() {
    this.props.history.push(`/followers/${this.state.userId}`);
  }

  onLogoutPress() {
    this.props.history.push(`/login`);
  }

  componentDidMount() {
    let profile = this.state.userId ?
      network.social.getUserProfile(this.state.userId) : network.account.getMyProfile();
    profile.then(res => {
      this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
      this.setState({userId: res.userId, loading: false});
    })
      .catch(err => {
      })
  }

  render() {
    let avatar = this.props.user.avatar || "http://via.placeholder.com/100x100";
    return (
      <Container>
        <Header>
          <Body>
          <Title>Profile</Title>
          </Body>
        </Header>
        {this.state.loading ? <Content><Spinner/></Content> :
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: avatar}}/>
                  <Body>
                  <Text>{this.props.user.name}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: avatar}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              {/*<CardItem>*/}
              {/*<Left>*/}
              {/*<Button transparent>*/}
              {/*<Icon active name="chatbubbles" />*/}
              {/*/!*<Text>{this.props.data.comments.length}</Text>*!/*/}
              {/*</Button>*/}
              {/*</Left>*/}
              {/*</CardItem>*/}
            </Card>
            {/*<CardItem cardBody>*/}
              {/*<Image source={{uri: this.props.user.avatar || "http://via.placeholder.com/100x100"}}*/}
                     {/*style={styles.avatar}/>*/}
              {/*<Text>{this.props.user.name}</Text>*/}
            {/*</CardItem>*/}
            <List>
              <ListItem cardBody>
                <Text>{this.props.user.posts} Posts</Text>
              </ListItem>
              <ListItem cardBody onPress={this.onFollowersPress.bind(this)}>
                <Text>{this.props.user.followers} Followers</Text>
              </ListItem>
              <ListItem cardBody onPress={this.onFollowingsPress.bind(this)}>
                <Text>{this.props.user.following} Following</Text>
              </ListItem>
              <ListItem cardBody onPress={this.onLogoutPress.bind(this)}>
                <Text style={styles.logout}> Logout</Text>
              </ListItem>
            </List>
          </Content>}
        <Footer/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    height: 100,
    borderRadius: 50,
    width: 100
  },
  logout: {
    color: 'red'
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
};

export default connect(
  mapStateToProps
)(UserPage);