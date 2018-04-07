/**
 * Created by kai on 2018/4/5.
 */
import React from 'react';
import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';
import Timeline from "./components/Timeline/Timeline";
import SearchTab from "./components/SearchTab/SearchTab";
import SearchBy from "./components/SearchTab/SearchBy";
import UserPage from "./components/User/UserPage"
import DishPhoto from "./components/DishPhoto"
import RestaurantPage from "./components/Restaurant/RestaurantPage"
import DishPage from "./components/Restaurant/DishPage"
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FollowerList from "./components/User/FollowerList";
import FollowingList from "./components/User/FollowingList";
import LandingPage from "./components/LandingPage";
import UserList from "./components/User/UserList";
import PostPhotoPage from "./components/PostPhotoPage";
import ViewPost from "./components/ViewPost";
import EditPostPage from "./components/EditPostPage";
import EditProfilePage from "./components/EditProfilePage";
import {Icon} from 'native-base';

const Tabs = TabNavigator({
  TimeLine:{
    screen:Timeline,
    navigationOptions:{
      tabBarIcon:<Icon name={"home"}/>
    }
  },
  Search:{
    screen:SearchTab,
    navigationOptions:{
      tabBarIcon:<Icon name={"search"}/>
    }
  },
  Profile:{
    screen:PersonalPage,
    navigationOptions:{
      tabBarIcon:<Icon name={"person"}/>
    }
  }
},{
  initialRouteName: 'TimeLine',
  tabBarOptions:{
  },
  // animationEnabled: true,
  swipeEnabled: false,
  tabBarPosition: 'bottom',
});

const AuthStack = StackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      title: "Login",
    },
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      title: "Register",
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
  }
},{
  headerMode:"none",
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

// export default SwitchNavigator(
//   {
//     Landing:{
//       screen: LandingPage
//     },
//     Tabs:Tabs,
//     Stacks:Stack
//   },
//   {
//     initialRouteName: 'Landing',
//   }
// );