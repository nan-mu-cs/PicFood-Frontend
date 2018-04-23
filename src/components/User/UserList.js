/**
 * Created by Chaofeng on 18/03/2018.
 */
import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import {StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import network from "../../network";

class UserList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onUnfollowPress(userId) {
    network.social.unfollowUserById(userId)
      .then(res => {
        // console.log(this.state.users);
        this.updateFollowStatus(this.state.users, userId, false);
        console.log('new state', this.state.users);
        this.setState({users: this.state.users});
        network.account.getMyProfile()
          .then(res => res.json())
          .then(res => {
            console.log(res.userId)
            this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
          });
      })
      .catch(res => {
      })
  }

  updateFollowStatus(userList, userId, status) {
    userList.forEach(user => {
      if (user.userId === userId) {
        user.following = status;
      }
    });
  }

  onFollowPress(userId) {
    network.social.followUserById(userId)
      .then(res => {
        console.log('onFollowPress', res);
        this.updateFollowStatus(this.state.users, userId, true);
        this.setState({users: this.state.users});
        console.log('onUnfollowPress', this.state.users);
        network.account.getMyProfile()
          .then(res => res.json())
          .then(res => {
            console.log(res)
            this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
          });
      })
      .catch(res => {
      })
  }

  onSearch(keyword) {
    network.social.searchUsers(this.state.keyword)
      .then(res => {
        this.setState({users: res});
      })
      .catch(err => {
      })
  }

  onUserPress(userId) {
    this.props.navigation.navigate('User',{userId});
  }

  componentDidMount() {
    network.social.searchUsers('')
      .then(res => {
        this.setState({users: res, loading: false});
        // this.props.dispatch({type: "GET_USERS", data: res});
      })
      .catch(err => {
      })
  }

  render() {
    let users = this.state.users.filter(item => item.userId !== this.props.user.userId);
    let userList = users.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <TouchableWithoutFeedback onPress={this.onUserPress.bind(this, item.userId)}>
          <Left>
            <Thumbnail source={{cache: 'force-cache', uri: item.avatar || "http://via.placeholder.com/100x100"}}/>
            <Text>{item.name}</Text>
          </Left>
        </TouchableWithoutFeedback>
        <Right>
          {item.following ?
            <Button danger small onPress={this.onUnfollowPress.bind(this, item.userId)}>
              <Text style={styles.buttonText}>Unfollow</Text>
            </Button> :
            <Button small onPress={this.onFollowPress.bind(this, item.userId)}>
              <Text style={styles.buttonText}>Follow</Text>
            </Button>
          }
        </Right>
      </ListItem>
    );

    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.onBackPress.bind(this)}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Find Users</Title>
          </Body>
          <Right/>
        </Header>
        {this.state.loading ? <Content><Spinner color='black'/></Content> :
          <Content>
            <Left>
              <Item>
                <Input placeholder='Search Users'
                       onChangeText={(value) => this.setState({keyword: value})}
                       onSubmitEditing={this.onSearch.bind(this)}/>
              </Item>
            </Left>
            <List>
              {userList}
            </List>
          </Content>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    // borderBottomWidth: 0
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
)(UserList);