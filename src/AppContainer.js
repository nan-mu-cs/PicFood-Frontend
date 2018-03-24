import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, FooterTab, Button, Text} from 'native-base';
import {Col, Row, Grid} from "react-native-easy-grid";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import Timeline from "./components/Timeline/Timeline";
import SearchTab from "./components/SearchTab/SearchTab";
import SearchPage from "./components/SearchPage";
import UserPage from "./components/UserPage"
import DishPhoto from "./components/DishPhoto"
import RestaurantPage from "./components/RestaurantPage"
import { connect } from 'react-redux';
import {AsyncStorage} from "react-native";
import { NativeRouter,Route,Switch } from 'react-router-native'
import ImageDetailPage from "./components/ImageDetailPage";
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FollowList from "./components/Users/FollowList";
import PostPhotoPage from "./components/PostPhotoPage";
import { withRouter } from 'react-router-native';
import network from "./network";

class App extends React.Component {
  constructor(props,context){
      super(props,context);

  }
  componentDidMount(){
      // console.log(this.props);
      AsyncStorage.multiGet(["email","password"],function (err,stores) {
          if(err){
              this.props.history.push("/login");
              console.log(err);
              return;
          }
          // console.log(username);
          // console.log(password);
          let email=stores[0][1];
          let password=stores[1][1];
          if(!email||!password){
              this.props.history.push("/login");
              console.log(err);
              return;
          }
          network.account.login({email,password})
              .then(response=>response.json())
              .then((res) => {
                  this.props.dispatch({type:"UPDATE_TOKEN",data:res.token});
                  this.props.history.push("/");
              })
              .catch((e) => {
                  this.props.history.push("/login");
                  console.log("ERR"+e.message);
              });
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
              <Route exact path="/dishphoto" component={DishPhoto}/>
              <Route path="/users" component={UserPage}>
                  <Route path=":id" component={UserPage}/>
              </Route>
              <Route path="/followers" component={FollowList}>
                  <Route path=":id" component={FollowList}/>
              </Route>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/post" component={PostPhotoPage}/>
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

