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
  Title
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer"
import network from "../../network/index";

class UserPage extends Component {
    constructor(props, context){
        super(props);
        this.state={
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
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.user.name}</Title>
                    </Body>
                </Header>
              {this.state.loading ? <Content><Spinner/></Content> :
                <Content>
                  <CardItem cardBody>
                    <Image source={{uri:this.props.user.avatar || "http://via.placeholder.com/100x100"}} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <List>
                    <ListItem last>
                      <Text>{this.props.user.posts} Posts</Text>
                    </ListItem>
                    <ListItem onPress={this.onFollowersPress.bind(this)}>
                      <Text>{this.props.user.followers} Followers</Text>
                    </ListItem>
                    <ListItem onPress={this.onFollowingsPress.bind(this)}>
                      <Text>{this.props.user.following} Following</Text>
                    </ListItem>
                  </List>
                </Content>}
                <Footer/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
});


const mapStateToProps = (state, ownProps) => {
    return{
        user:state.user
    }
};

export default connect(
    mapStateToProps
)(UserPage);