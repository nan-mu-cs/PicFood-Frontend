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
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Form,
  Input,
  Label,
  Item,
  Toast
} from 'native-base';
import {
  Text, StyleSheet, ScrollView, AsyncStorage, View, Image, ImageBackground,
  TouchableNativeFeedback, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import network from "../network";

class LoginPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false

    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // console.log(this.refs)
    // console.log(this.state);
    // console.log(this.state);
    AsyncStorage.multiSet([["email", this.state.email], ["password", this.state.password]], (err) => {
      if (err) {
        console.log(err);
        return;
      }
      network.account.login({email: this.state.email, password: this.state.password})
        .then(response => response.json())
        .then((res) => {
          //res = res.json();
          //console.log(res);
          if (!res.token) {
            this.setState({
              error: true
            });
            return;
          }
          // console.log(res);
          // console.log(res._bodyInit);
          this.props.dispatch({type: "UPDATE_TOKEN", data: res.token});
          // this.props.history.push("/");
          this.props.navigation.navigate('Landing');
        })
        .catch((e) => {
          this.setState({
            error: true
          });
          console.log("ERR" + e.message);
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Container style={{justifyContent: "center"}}>
          <Form style={{width: 300}}>
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
            <Button success block onPress={this.handleLogin} style={styles.shadow}>
              <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
            </Button>
            {this.state.error && Toast.show({
              text: 'Wrong email or password!',
              position: 'bottom',
              buttonText: 'Okay'
            })
            }
          </View>
          <View style={styles.titleDiv}>
            <Text style={styles.title}>PicFood</Text>
          </View>
          <View style={styles.bottomDiv}>
            <Text style={styles.signupHint}>Not yet have an account?
            </Text>
            <Button style={styles.registerBtn}
                    onPress={() => {this.props.navigation.navigate('Register')}}>
              <Text style={{color: 'white', fontSize: 16}}>Register</Text></Button>
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
  registerBtn: {
    marginLeft: 10, paddingHorizontal: 14, height: 30,
    shadowOffset: {width: 1, height: 1,},
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


// const mapStateToProps = (state, ownProps) => {
//     return{
//     }
// };
//
export default connect()(LoginPage);

// export default withRouter(LoginPage);