import React from 'react';
import {AsyncStorage, StyleSheet} from 'react-native';
import {Button, Container, Content, FooterTab, Spinner} from 'native-base';
import Timeline from "./components/Timeline/Timeline";
import SearchTab from "./components/SearchTab/SearchTab";
import SearchBy from "./components/SearchTab/SearchBy";
import UserPage from "./components/User/UserPage"
import DishPhoto from "./components/DishPhoto"
import RestaurantPage from "./components/Restaurant/RestaurantPage"
import DishPage from "./components/Restaurant/DishPage"
import {connect} from 'react-redux';
import ImageDetailPage from "./components/ImageDetailPage";
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FollowerList from "./components/User/FollowerList";
import FollowingList from "./components/User/FollowingList";
import LandingPage from "./components/LandingPage";
import UserList from "./components/User/UserList";
import PostPhotoPage from "./components/PostPhotoPage";
import ViewPost from "./components/ViewPost";
import network from "./network";
import {Location, Permissions} from 'expo';
import EditPostPage from "./components/EditPostPage";
import EditProfilePage from "./components/EditProfilePage";
import { StackNavigator } from 'react-navigation';
import Router from "./router";
class App extends React.Component {

  render() {
    return (
     <Router/>
    )
  }
}
export default App;
