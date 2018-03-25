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
  Tab,
  Tabs,
  Title
} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import {withRouter} from 'react-router-native';
import network from "../../network";

class FollowingList extends Component {
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

  componentDidMount() {
    network.social.getMyFollowings()
      .then(res => {
        console.log('FollowingList', res);
        this.props.dispatch({type: "GET_FOLLOWINGS", data: res});
      })
      .catch(err => {})
  }

  render() {
    let userList = this.props.followings.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <Left>
          <Thumbnail source={{uri: item.avatar}}/>
          <Text>{item.user}</Text>
        </Left>
        <Right>
          <Button small onPress={this.onUnfollowPress.bind(this, item.userId)}>
            <Text style={styles.buttonText}>Unfollow</Text>
          </Button>
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
          <Title>Followings</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
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
    followings: state.followings,
  }
};

export default withRouter(connect(
  mapStateToProps
)(FollowingList));