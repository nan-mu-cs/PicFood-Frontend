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
import {NativeRouter, Route, Switch, withRouter} from 'react-router-native'
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

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/timeline" component={Timeline}/>
        <Route path="/search" component={SearchTab}/>
        <Route path="/userlist" component={UserList}/>
        <Route path="/restaurants/:id" component={RestaurantPage}/>
        <Route path="/dishes/:id" component={DishPage}/>
        <Route path="/dishphoto/:id" component={DishPhoto}/>
        <Route path="/searchby" component={SearchBy}/>
        <Route path="/users" component={PersonalPage}/>
        <Route path="/user/:id" component={UserPage}/>
        <Route path="/editprofile" component={EditProfilePage}/>
        <Route path="/followers/:userId" component={FollowerList}/>
        <Route path="/followings/:userId" component={FollowingList}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/post" component={PostPhotoPage}/>
        <Route exact path="/editpost/:postId" component={EditPostPage}/>
        <Route exact path="/viewpost/:postId" component={ViewPost}/>
      </Switch>
    )
  }
}

export default App;
