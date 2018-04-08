/**
 * Created by jin on 05/04/2018.
 */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  FooterTab,
  Keyboard,
  Button,
  Text,
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Fab,
  Left,
  Right,
  Item,
  Input,
  Label,
  Thumbnail
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import network from "../network";
import {ImagePicker} from "expo";

// import Autocomplete from "react-native-autocomplete-input";

class EditProfilePage extends Component {
  constructor(props, context) {
    super(props);
    // console.log(this.props.navigation.state);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      avatar:"",
      email:"",
      bio: "",
      name: "",
    };
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }
  componentWillMount() {
    network.account.getMyProfile()
      .then(response=>response.json()).then((res) => {
        this.setState({name: res.name});
        this.setState({avatar: res.avatar});
        this.setState({email: res.email});
        this.setState({bio: res.bio});
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleClickBack() {
    this.props.navigation.goBack();
    // this.props.history.goBack();
  }

  handleClickPost() {
    console.log("update name to " + this.state.name);
    network.account.postUserProfile({
        name: this.state.name,
        avatar: this.state.avatar
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
    let avatar;
    if (this.state.avatar)
      avatar = <Thumbnail large source={{uri: this.state.avatar}} style={{alignSelf: "center", marginTop: 10}}/>;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Edit Post</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>
            {avatar}
          <Row size={1}>
            <Col>
              <Button style={{backgroundColor: '#5067FF', alignSelf: "center", marginTop: 30}}
                                             onPress={this.handleUploadAvatar}>
                <Text>Upload Avatar</Text>
              </Button>
            </Col>
          </Row>
          <Row size={1}>
            <Col>
              <Item floatingLabel>
                <Label>User Name</Label>
                <Input value={this.state.name} onChangeText={(val) => this.setState({name: val})}/>
              </Item>
            </Col>
          </Row>

          <Row size={2}>
            <Col size={2}>
              <Button success block onPress={this.handleClickPost}>
                <Text>Change</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
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