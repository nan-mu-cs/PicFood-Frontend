/**
 * Created by Chaofeng on 18/03/2018.
 */
import React, {Component} from 'react';
import {
  ActionSheet,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  FooterTab,
  Header,
  Text,
  Thumbnail,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Tab,
  Tabs,
  Title
} from 'native-base';
import {StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import network from "../../network";

class FollowingList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      loading: true,
      followings: []
    };
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onUnfollowPress(userId) {
    network.social.unfollowUserById(userId)
      .then(res => {
        let newFollowings = this.filterOutUnfollowedUser(this.state.followings, userId);
        this.setState({followings: newFollowings});
        network.account.getMyProfile()
          .then(res => res.json())
          .then(res => {
            this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
          });
      })
      .catch(res => {
      })
  }

  onUserPress(userId) {
    this.props.navigation.navigate('User',{userId});
  }

  filterOutUnfollowedUser(userList, userId) {
    return userList.filter(user => {
      return user.userId !== userId;
    });
  }

  componentDidMount() {
    const followingsPro = this.state.userId ? network.social.getFollowingsById(this.state.userId) :
      network.social.getMyFollowings();
    followingsPro
      .then(res => {
        console.log('FollowingList', res);
        this.setState({loading: false, followings: res});
      })
      .catch(err => {
      })
  }

  render() {
    let followings = this.state.followings.filter(item => item.userId !== this.props.user.userId);
    let userList = followings.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <TouchableWithoutFeedback onPress={this.onUserPress.bind(this, item.userId)}>
          <Left>
            <Thumbnail source={{cache: 'force-cache', uri: item.avatar || "http://via.placeholder.com/100x100"}}/>
            <Text>{item.name}</Text>
          </Left>
        </TouchableWithoutFeedback>
        <Right>
          <Button danger small onPress={this.onUnfollowPress.bind(this, item.userId)}>
            <Text style={styles.buttonText}>Unfollow</Text>
          </Button>
        </Right>
      </ListItem>
    );

    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar backgroundColor="blue" barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.onBackPress.bind(this)}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Followings</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          {this.state.loading ? <Spinner color='black'/> :
            <List>
              {userList}
            </List>}
        </Content>
        {/*<Footer/>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
  },
  buttonText: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

export default connect(
  mapStateToProps
)(FollowingList);