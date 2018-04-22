/**
 * Created by kai on 2018/4/5.
 */
import React from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import Timeline from "./components/Timeline/Timeline";
import SearchTab from "./components/SearchTab/SearchTab";
import SearchBy from "./components/SearchTab/SearchBy";
import UserPage from "./components/User/UserPage"
import DishPhoto from "./components/Post/DishPhoto"
import RestaurantPage from "./components/Restaurant/RestaurantPage"
import DishPage from "./components/Restaurant/DishPage"
import PersonalPage from "./components/User/PersonalPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import FollowerList from "./components/User/FollowerList";
import FollowingList from "./components/User/FollowingList";
import LandingPage from "./components/Auth/LandingPage";
import UserList from "./components/User/UserList";
import PostPhotoPage from "./components/Post/PostPhotoPage";
import ViewPost from "./components/Post/ViewPost";
import EditPostPage from "./components/Post/EditPostPage";
import EditProfilePage from "./components/User/EditProfilePage";
import MyPostsPage from "./components/User/MyPostsPage";
import {Icon} from 'native-base';

const Tabs = TabNavigator({
  TimeLine:{
    screen:Timeline,
    navigationOptions:{
      tabBarIcon:<Icon style={{color: 'white'}} name={"home"}/>
    }
  },
  Search:{
    screen:SearchTab,
    navigationOptions:{
      tabBarIcon:<Icon style={{color: 'white'}} name={"search"}/>
    }
  },
  Profile:{
    screen:PersonalPage,
    navigationOptions:{
      tabBarIcon:<Icon style={{color: 'white'}} name={"person"}/>
    }
  }
},{
  initialRouteName: 'TimeLine',
  tabBarOptions:{
    style: {
      backgroundColor: '#D8485D',
    },
    activeBackgroundColor: '#526bce',
    labelStyle: {
      color: 'white',
      marginTop: -5,
      paddingBottom: 3,
    },
    indicatorStyle: {
      borderBottomColor: 'blue',
      borderBottomWidth: 3,
    }
  },
  animationEnabled: true,
  swipeEnabled: false,
  tabBarPosition: 'bottom',
});

const AuthStack = StackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      header: null,
    }
  }
},{
  initialRouteName: 'Login',
});

const AppStack = StackNavigator({
  Tabs:Tabs,
  UserList:{
    screen:UserList
  },
  Restaurant:{
    screen:RestaurantPage
  },
  Dish:{
    screen:DishPage
  },
  DishPhoto:{
    screen:DishPhoto
  },
  SearchBy:{
    screen:SearchBy
  },
  User:{
    screen:UserPage
  },
  EditProfile:{
    screen:EditProfilePage
  },
  Followers:{
    screen:FollowerList
  },
  Followings:{
    screen:FollowingList
  },
  Post:{
    screen:PostPhotoPage
  },
  EditPost:{
    screen:EditPostPage
  },
  ViewPost:{
    screen:ViewPost
  },
  MyPosts:{
    screen:MyPostsPage
  }
},{
  headerMode:"none",
  headerTintColor: 'white',
});

export default RootRouter = SwitchNavigator({
  App:AppStack,
  Auth:AuthStack,
  Landing:{
    screen: LandingPage
  },
},{
  headerMode:"none",
  initialRouteName: 'Landing',
});
