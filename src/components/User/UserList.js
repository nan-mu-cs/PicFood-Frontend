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
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Tab,
  Tabs,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import {withRouter} from 'react-router-native';
import network from "../../network";

class UserList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  onBackPress() {
    this.props.history.goBack();
  }

  onUnfollowPress(userId) {
    network.social.unfollowUserById(userId)
      .then(res => {
        console.log('onUnfollowPress', res);
      })
      .catch(res => {
      })
  }

  onFollowPress(userId) {
    network.social.followUserById(userId)
      .then(res => {
        console.log('onFollowPress', res);
      })
      .catch(res => {
      })
  }

  onSearch(keyword) {
    network.social.searchUsers(this.state.keyword)
      .then(res => {
        this.props.dispatch({type:"GET_USERS", data: res});
      })
      .catch(err => {})
  }

  componentDidMount() {
    network.social.searchUsers('')
      .then(res => {
        console.log('searchUsers', res);
        this.props.dispatch({type: "GET_USERS", data: res});
      })
      .catch(err => {})
  }

  render() {
    let userList = this.props.users.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <Left>
          <Thumbnail source={{uri: item.avatar || "http://via.placeholder.com/100x100"}}/>
          <Text>{item.user}</Text>
        </Left>
        <Right>
          {item.following ?
            <Button danger onPress={this.onUnfollowPress.bind(this, item.userId)}>
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
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress.bind(this)}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Users</Title>
          </Body>
          <Right/>
        </Header>
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
        </Content>
        <Footer/>
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
    users: state.users,
  }
};

export default withRouter(connect(
  mapStateToProps
)(UserList));