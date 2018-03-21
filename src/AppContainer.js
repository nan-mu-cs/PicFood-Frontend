import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, FooterTab, Button, Text} from 'native-base';
import {Col, Row, Grid} from "react-native-easy-grid";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import Timeline from "./components/Timeline/Timeline";
import SearchTab from "./components/SearchTab/SearchTab";
import SearchPage from "./components/SearchPage";
import RestaurantPage from "./components/RestaurantPage"
import { connect } from 'react-redux';
import {AsyncStorage} from "react-native";
import { NativeRouter,Route,Switch } from 'react-router-native'
import ImageDetailPage from "./components/ImageDetailPage";
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { withRouter } from 'react-router-native';

class App extends React.Component {
  constructor(props,context){
      super(props,context);

  }
  componentDidMount(){
      // console.log(this.props);
      AsyncStorage.multiGet(["username","password"],function (err,stores) {
          if(err||!username||!password){
              this.props.history.push("/login");
              console.log(err);
              return;
          }
          // console.log(username);
          // console.log(password);
          let username=stores[0][0];
          let password=stores[0][0];
      }.bind(this));
  }
  render() {
      return (
          <Switch>
              <Route exact path="/" component={Timeline}/>
              <Route path="/search" component={SearchTab}/>
            <Route path="/restaurants" component={RestaurantPage}>
              <Route path=":id" component={RestaurantPage}/>
            </Route>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              {/*<Route path="/person" component={PersonalPage}/>*/}
              {/*<Route path="/image-detail" component={ImageDetailPage}/>*/}
          </Switch>
      )
    // return (
    //     {/*<NativeRouter>*/}
    //
    //     {/*</NativeRouter>*/}
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab
  }
};

export default withRouter(connect(
    mapStateToProps
)(App));

