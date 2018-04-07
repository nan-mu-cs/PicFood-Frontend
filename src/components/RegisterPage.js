/**
 * Created by kai on 20/03/2018.
 */

import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  FooterTab,
  Button,
  Text,
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Form,
  Input,
  Label,
  Item,
  Left,
  Right,
  Toast,
  Thumbnail, View
} from 'native-base';
import {StyleSheet, ScrollView, AsyncStorage, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import {ImagePicker} from 'expo';
import network from "../network";

class RegisterPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      avatar: "",
      error: false,
      errorMessage: ""
    };
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }

  handleUploadAvatar() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    }).then((result) => {
      // console.log(result);
      if (result.cancelled) {
        return;
      }
      network.storage.uploadFile(result.uri)
        .then(res => {
          console.log(res);
          return res.text();
        })
        .then((res) => {
          console.log(res);
          this.setState({
            avatar: res
          });
        }).catch((err) => {
        console.log(err);
      });
    });
  }

  handleClickRegister() {
    console.log(this.state);
    network.account.register({
      email: this.state.email,
      password: this.state.password,
      name: this.state.username,
      avatar: this.state.avatar
    })
      .then(response => response.json())
      .then(res => {
        AsyncStorage.multiSet([["email", this.state.email], ["password", this.state.password]], (err) => {
        });
        this.props.dispatch({type: "UPDATE_TOKEN", data: res.token});
        console.log(res)
        this.props.navigation.navigate('App')
      }).catch(error => {
      this.setState({
        error: true,
        errorMessage: error.error
      });
      console.log(error);
    });
  }

  render() {
    let avatar;
    if (this.state.avatar)
      avatar = <Thumbnail large source={{cache: 'force-cache', uri: this.state.avatar}}
                          style={{alignSelf: "center", marginTop: 20}}/>;
    return (
      <View style={styles.container}>
        <Container style={{justifyContent: "center"}}>
          <Form style={{width: 300}}>
            <Item regular style={styles.inputBox}>
              <Input placeholder='Name' style={{borderWidth: 0,}} value={this.state.username}
                     onChangeText={(val) => this.setState({username: val})}/>
            </Item>
            <Item regular style={styles.inputBox}>
              <Input placeholder='Email' style={{borderWidth: 0,}} value={this.state.email}
                     onChangeText={(val) => this.setState({email: val})}/>
            </Item>

            <Item regular style={styles.inputBox}>
              <Input placeholder='Password' secureTextEntry style={{borderWidth: 0,}} value={this.state.password}
                     onChangeText={(val) => this.setState({password: val})}/>
            </Item>
          </Form>
          <View>
            <Button block onPress={this.handleClickRegister} style={styles.shadow}>
              <Text style={{fontSize: 18, color: 'white'}}>Register</Text>
            </Button>
            {this.state.error && Toast.show({
              text: 'Wrong email or password!',
              position: 'bottom',
              buttonText: 'Okay'
            })
            }
          </View>
          <View style={styles.titleDiv}>
            <Text style={styles.title}>Sign Up!</Text>
          </View>
          <View style={styles.bottomDiv}>
            <Text style={styles.signupHint}>Already had an account?
            </Text>
            <Button success style={styles.signinBtn} onPress={() => {
              this.props.navigation.pop();
            }}><Text style={{color: 'white', fontSize: 15, paddingLeft: 10, paddingRight: 10}}>Sign In</Text></Button>
          </View>
        </Container>
        <ImageBackground source={require('../../assets/landing1.jpg')}
                         style={{...StyleSheet.absoluteFillObject, zIndex: -1}}/>
        <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.45)', zIndex: -1}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleDiv: {alignItems: 'center', position: 'absolute', left: 0, right: 0, top: 120,},
  title: {
    color: 'white', fontSize: 42,
    shadowOffset: {width: 1, height: 1,},
    shadowColor: 'white',
    shadowOpacity: 0.3,
  },
  signupHint: {
    fontSize: 15, color: 'white', shadowOffset: {width: 2, height: 2,},
    shadowColor: 'white',
    shadowOpacity: 0.5,
  },
  signinBtn: {
    marginLeft: 10, paddingHorizontal: 0, height: 30,
    fontSize: 16, color: 'white', shadowOffset: {width: 1, height: 1,},
    shadowColor: 'white',
    shadowOpacity: 0.3,
  },
  inputBox: {marginBottom: 20, borderRadius: 6, borderWidth: 0, height: 47, backgroundColor: '#fdfdf8'},
  shadow: {
    shadowOffset: {width: 2, height: 2,},
    shadowColor: 'white',
    shadowOpacity: .4,
  },
  bottomDiv: {
    alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 30,
    flexDirection: 'row', justifyContent: "center", alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps
)(RegisterPage);

// export default RegisterPage;