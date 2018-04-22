/**
 * Created by Chaofeng on 30/03/2018.
 */
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import network from "../network";
import {Location, Permissions} from "expo";

class LandingPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.getUserInformation();
    this.getLocation();
  }

  getUserInformation() {
    AsyncStorage.multiGet(["email", "password"], function (err, stores) {
      if (err) {
        this.props.navigation.navigate('Auth');
        console.log(err);
        return;
      }
      let email = stores[0][1];
      let password = stores[1][1];
      if (!email || !password) {
        this.setState({
          loading: false
        });
        this.props.navigation.navigate('Auth');
        console.log(err);
        return;
      }
      network.account.login({email, password})
        .then(response => response.json())
        .then((res) => {
          this.setState({
            loading: false
          });
          console.log("token", res);
          this.props.dispatch({type: "UPDATE_TOKEN", data: res.token});
          network.account.getMyProfile()
            .then(res => res.json())
            .then(res => {
              this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
              this.props.navigation.navigate('App');
            })
            .catch(err => {
            });
        })
        .catch((e) => {
          this.setState({
            loading: false
          });
          this.props.navigation.navigate('Auth');
          console.log("ERR" + e.message);
        });
    }.bind(this));
  }

  getLocation() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(res => {
        if (res.status !== 'granted')
          return;
        Location.getCurrentPositionAsync({})
          .then((res) => {
            this.props.dispatch({type: "GET_LOCATION", data: {lat: res.coords.latitude, lon: res.coords.longitude}});
          }).catch(err => {
          console.log(err);
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pic Food</Text>
        <Text style={styles.description}>Welcome!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8485D'
  },
  title: {
    fontSize: 24,
    marginBottom: 18,
    color: 'white'
  },
  description: {
    fontSize: 18,
    color: '#cccccc'
  }
});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps
)(LandingPage);