import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, FooterTab, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import Timeline from "./components/Timeline/Timeline";
import SearchPage from "./components/SearchPage";
import RestaurantPage from "./components/RestaurantPage"
import { connect } from 'react-redux';
import { NativeRouter,Route,Switch } from 'react-router-native'
import ImageDetailPage from "./components/ImageDetailPage";
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
class App extends React.Component {
  constructor(props,context){
      super(props,context);

  }
  componentDidMount(){

  }
  render() {
    return (
        <NativeRouter>
          <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/restaurants" component={RestaurantPage}/>
          {/*<Route path="/person" component={PersonalPage}/>*/}
          {/*<Route path="/image-detail" component={ImageDetailPage}/>*/}
          </Switch>
        </NativeRouter>
    );
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
    return{
      currentTab:state.currentTab
    }
};

export default connect(
    mapStateToProps
)(App);