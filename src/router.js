/**
 * Created by kai on 2018/4/5.
 */
import {TabNavigator, StackNavigator, SwitchNavigator} from 'react-navigation';
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

const Tabs = TabNavigator({
  Timeline:{
    screen:Timeline,
  },
  Search:{
    screen:SearchTab
  },
  Profile:{
    screen:PersonalPage
  }
},{
  tabBarOptions:{
    activeBackgroundColor:"grey",
  },
  animationEnabled: true,
  swipeEnabled: false,
  tabBarPosition: 'bottom',
});

const Stack = StackNavigator({

  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: "Login",
    },
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      title: "Register",
    }
  },
}, {
  initialRouteName: 'Landing',
});

export default SwitchNavigator(
  {
    Landing:{
      screen: LandingPage
    },
    Tabs:Tabs
  },
  {
    initialRouteName: 'Landing',
  }
);