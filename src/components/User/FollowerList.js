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
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import network from "../../network";

class FollowerList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      userId: this.props.navigation.state.params.userId,
      followers: []
    };
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onUserPress(userId) {
    this.props.navigation.navigate('User',{userId});
  }

  componentDidMount() {
    const followersPro = this.state.userId ? network.social.getFollowersById(this.state.userId) :
      network.social.getMyFollowers();
    followersPro
      .then(res => {
        console.log('FollowerList', res);
        this.setState({loading: false, followers: res})
        this.props.dispatch({type: "GET_FOLLOWERS", data: res});
      })
      .catch(err => {
      })
  }

  render() {
    let followers = this.state.followers.filter(item => item.userId !== this.props.user.userId);
    let userList = followers.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <TouchableWithoutFeedback onPress={this.onUserPress.bind(this, item.userId)}>
          <Left>
            <Thumbnail source={{cache: 'force-cache', uri: item.avatar || "http://via.placeholder.com/100x100"}}/>
            <Text>{item.name}</Text>
          </Left>
        </TouchableWithoutFeedback>
      </ListItem>
    );

    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <Left>
            <Button transparent onPress={this.onBackPress.bind(this)}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Followers</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          {this.state.loading ? <Spinner color='black'/> :
            <List>
              {userList}
            </List>}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    // borderBottomWidth: 0
  },
  buttonText: {
    fontSize: 10
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

export default connect(
  mapStateToProps
)(FollowerList);