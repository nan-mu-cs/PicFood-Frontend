/**
 * Created by Chaofeng on 30/03/2018.
 */
import React, {Component} from 'react';
import {Button, Container, Content, Footer, FooterTab, Header, Icon, Spinner} from 'native-base';
import {View, Text, AsyncStorage, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-native';
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
    // console.log(this.props);
    this.getUserInformation();
    this.getLocation();
  }

  loadingFinished() {
    this.props.onLoadingFinish();
  }

  getUserInformation() {
    AsyncStorage.multiGet(["email", "password"], function (err, stores) {
      if (err) {
        this.props.history.push("/login");
        console.log(err);
        return;
      }
      let email = stores[0][1];
      let password = stores[1][1];
      if (!email || !password) {
        this.setState({
          loading: false
        });
        this.props.history.push("/login");
        console.log(err);
        return;
      }
      network.account.login({email, password})
        .then(response => response.json())
        .then((res) => {
          this.setState({
            loading: false
          });
          console.log("token ");
          console.log(res);
          this.props.dispatch({type: "UPDATE_TOKEN", data: res.token});
          network.account.getMyProfile()
            .then(res => res.json())
            .then(res => {
              this.props.dispatch({type: 'GET_USER_PROFILE', data: res});
              this.props.history.push("/timeline");
            })
            .catch(err => {
            });
        })
        .catch((e) => {
          this.setState({
            loading: false
          });
          this.props.history.push("/login");
          console.log("ERR" + e.message);
        });
    }.bind(this));
  }

  getLocation() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(res => {
        //console.log(status);
        if (res.status !== 'granted')
          return;
        Location.getCurrentPositionAsync({})
          .then((res) => {
            //console.log(res);
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
        <Spinner color='black'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 18
  },
  description: {
    fontSize: 18,
    color: '#808080'
  }
});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withRouter(connect(
  mapStateToProps
)(LandingPage));