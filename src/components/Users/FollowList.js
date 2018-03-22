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

class FollowList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    console.log('hello')
  }

  onBackPress = () => {
    this.props.history.push(`/users`);
  }


  render() {
    let userList = this.props.followers.map(item =>
      <ListItem key={item.id} style={styles.listItem}>
        <Left>
          <Thumbnail source={{uri: item.avatar}}/>
          <Text>{item.user}</Text>
        </Left>
        <Right>
          <Button small>
            <Text style={styles.buttonText}>Unfollow</Text>
          </Button>
        </Right>
      </ListItem>
    );

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          <Title>Followers</Title>
          </Body>
          <Right />
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
    followers: state.followers,
  }
};

export default withRouter(connect(
  mapStateToProps
)(FollowList));