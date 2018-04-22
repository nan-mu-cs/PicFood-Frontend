/**
 * Created by jin on 05/04/2018.
 */
import React, {Component} from 'react';
import {
  Body,
  Button,
  Container, Content,
  Header,
  Icon,
  Input,
  Item,
  Keyboard,
  Label,
  Left,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import {StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import network from "../../network/index";
import {ImagePicker} from "expo";

// import Autocomplete from "react-native-autocomplete-input";

class EditProfilePage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      avatar: "",
      email: "",
      bio: "",
      name: "",
      fanCount: 0,
      followCount: 0
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }

  componentWillMount() {
    network.account.getMyProfile()
      .then(response => response.json()).then((res) => {
      this.setState({name: res.name});
      this.setState({avatar: res.avatar});
      this.setState({email: res.email});
      this.setState({bio: res.bio});
      this.setState({followCount: res.followCount});
      this.setState({following: res.following});
    })
      .catch(err => {
        console.log(err);
      })
  }

  handleClickBack() {
    this.props.navigation.goBack();
  }

  handleClickPost() {
    console.log("update name to " + this.state.name);
    network.account.postUserProfile({
      userId: this.state.userId,
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      followCount: this.state.followCount,
      fanCount: this.state.fanCount
    }).then(res => res.json())
      .then(res => {
        console.log("====== update success ======")
        console.log(res);
        console.log("============== update profile =============")
        this.props.dispatch({type: 'UPDATE_USER_PROFILE', data: res});
      }).catch(err => {
      console.log(err);
    });

    // network.account.getMyProfile()  // need to update profile
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("============== update profile =============")
    //     this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
    //     // this.props.history.push("/timeline");
    //     this.props.navigation.navigate('App');
    //   })
    //   .catch(err => {
    //   });

    this.props.navigation.goBack();
  }

  handleUploadAvatar() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    }).then((result) => {
      if (result.cancelled) {
        return;
      }
      network.storage.uploadFile(result.uri)
        .then(res => {
          return res.text();
        })
        .then((res) => {
          this.setState({avatar: res});
        }).catch((err) => {
        console.log(err);
      });
    });
  }

  render() {
    let avatar = this.state.avatar;
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar backgroundColor="blue" barStyle="light-content"/>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon style={{color: 'white'}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: 'white'}}>Edit Profile</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={{height: 100, marginTop: 10}}>
            {this.state.avatar ?
            <Thumbnail large source={{uri: avatar}} style={{alignSelf: "center", marginTop: 10}}/> : null}
          </View>
          <Button small style={{backgroundColor: '#5067FF', alignSelf: "center", marginTop: 10}}
                  onPress={this.handleUploadAvatar}>
            <Text>Change Avatar</Text>
          </Button>
          <View style={{paddingHorizontal: 30}}>
          <Item floatingLabel style={{marginVertical: 30}}>
            <Label>Name</Label>
            <Input value={this.state.name} onChangeText={(val) => this.setState({name: val})}/>
          </Item>
          <Button success block onPress={this.handleClickPost}>
            <Text>Apply</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps
)(EditProfilePage);