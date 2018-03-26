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
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import {withRouter} from 'react-router-native';
import network from "../../network";

class FollowerList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      userId: this.props.match.params.userId
    };
  }

  onBackPress() {
    this.props.history.goBack();
  }

  componentDidMount() {
    network.social.getMyFollowers()
      .then(res => {
        // console.log('FollowerList', res);
        this.setState({loading: false})
        this.props.dispatch({type: "GET_FOLLOWERS", data: res});
      })
      .catch(err => {})
  }

  render() {
    let userList = this.props.followers.map(item =>
      <ListItem key={item.userId} style={styles.listItem}>
        <Left>
          <Thumbnail source={{uri: item.avatar || "http://via.placeholder.com/100x100"}}/>
          <Text>{item.name}</Text>
        </Left>
        {/*<Right>*/}
          {/*<Button small onPress={this.onUnfollowPress.bind(this)}>*/}
            {/*<Text style={styles.buttonText}>Unfollow</Text>*/}
          {/*</Button>*/}
        {/*</Right>*/}
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
          <Title>Followers</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          {this.state.loading ? <Spinner/> :
          <List>
            {userList}
          </List>}
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
)(FollowerList));