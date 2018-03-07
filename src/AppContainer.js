import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, FooterTab, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import Timeline from "./components/Timeline";
import SearchPage from "./components/SearchPage";
import { connect } from 'react-redux';
import { NativeRouter,Route,Switch } from 'react-router-native'
import ImageDetailPage from "./components/ImageDetailPage";

class App extends React.Component {
  render() {
    return (
        <NativeRouter>
          <Switch>
          <Route exact path="/" component={Timeline}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/image-detail" component={ImageDetailPage}/>
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