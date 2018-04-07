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
import {Text, StyleSheet, ScrollView, AsyncStorage, View, Image, ImageBackground} from 'react-native';
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
          this.props.navigation.navigate('App');
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
            <Item regular style={{marginBottom: 20}}>
              {/*<Label>Email</Label>*/}
              <Input placeholder='Email' value={this.state.email} onChangeText={(val) => this.setState({email: val})}/>
            </Item>
            <Item regular>
              {/*<Label>Password</Label>*/}
              <Input placeholder='Password' secureTextEntry value={this.state.password}
                     onChangeText={(val) => this.setState({password: val})}/>
            </Item>
          </Form>
          <View style={{marginTop: 30}}>
            <Button success block style={{marginLeft: 5, marginRight: 5}} onPress={this.handleLogin}>
              <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
            </Button>
            {/*<Button success block style={{flex: 1, marginLeft: 5, marginRight: 5}} onPress={() => {*/}
            {/*this.props.navigation.navigate('Register');*/}
            {/*}}>*/}
            {/*</Button>*/}
            {this.state.error && Toast.show({
              text: 'Wrong email or password!',
              position: 'bottom',
              buttonText: 'Okay'
            })
            }
          </View>
          <View style={{alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 30}}>
            <Text style={{fontSize: 16, color: 'white'}}>Not yet have an account? Register!</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    zIndex: 1,
  },
  overlay: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});


// const mapStateToProps = (state, ownProps) => {
//     return{
//     }
// };
//
export default connect()(LoginPage);

// export default withRouter(LoginPage);