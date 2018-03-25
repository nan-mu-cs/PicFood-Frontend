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
import { connect } from 'react-redux';
import { NativeRouter,Route,Switch,withRouter } from 'react-router-native'
import ImageDetailPage from "./components/ImageDetailPage";
import PersonalPage from "./components/PersonalPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FollowerList from "./components/User/FollowerList";
import FollowingList from "./components/User/FollowingList";
import PostPhotoPage from "./components/PostPhotoPage";
import ViewPost from "./components/ViewPost";
import network from "./network";
import {Location, Permissions} from 'expo';

class App extends React.Component {
  constructor(props,context){
      super(props,context);
      this.state={
        loading:true
      };
      this.getUserInformation = this.getUserInformation.bind(this);
      this.getLocation = this.getLocation.bind(this);
  }
  componentDidMount(){
      // console.log(this.props);
      this.getUserInformation();
      this.getLocation();
  }

  getUserInformation(){
      console.log("login!!!");
      AsyncStorage.multiGet(["email","password"],function (err,stores) {
          console.log("err"+err);
          if(err){
              this.props.history.push("/login");
              console.log(err);
              return;
          }
          let email=stores[0][1];
          let password=stores[1][1];
          if(!email||!password){
            this.setState({
              loading:false
            });
              this.props.history.push("/login");
              console.log(err);
              return;
          }
          network.account.login({email,password})
              .then(response=>response.json())
              .then((res) => {
                  this.setState({
                      loading:false
                  });
                  console.log("token ");
                  console.log(res);
                  this.props.dispatch({type:"UPDATE_TOKEN",data:res.token});
                  this.props.history.push("/");
              })
              .catch((e) => {
                  this.setState({
                      loading:false
                  });
                  this.props.history.push("/login");
                  console.log("ERR"+e.message);
              });
      }.bind(this));
  }
  getLocation(){
      Permissions.askAsync(Permissions.LOCATION)
          .then(res=>{
              //console.log(status);
              if (res.status !== 'granted')
                  return;
              Location.getCurrentPositionAsync({})
                  .then((res)=>{
                    //console.log(res);
                     this.props.dispatch({type:"GET_LOCATION",data:{lat:res.coords.latitude,lon:res.coords.longitude}});
                  }).catch(err=>{
                      console.log(err);
              })
          })
  }
  initialRestaurantsDishes(lat, lon) {
    network.restaurant.getRestaurantsByLocation(lat, lon)
      .then(res => {
        console.log(res);
        this.props.dispatch({type:"GET_SEARCHED_RESTAURANTS", data: res});
      })
      .catch(err => {})
  }
  render() {
      if(this.state.loading)
          return <Spinner />;
      return (
          <Switch>
              <Route exact path="/" component={Timeline}/>
              <Route path="/search" component={SearchTab}/>
              <Route path="/restaurants/:id" component={RestaurantPage} />
              <Route path="/dishes/:id" component={DishPage} />
              <Route path="/dishphoto/:id" component={DishPhoto} />
              <Route path="/searchby" component={SearchBy}/>
              <Route path="/users" component={UserPage} />
              <Route path="/users/:id" component={UserPage} />
              <Route path="/followers/:userId" component={FollowerList}/>
              <Route path="/followings/:userId" component={FollowingList}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/post" component={PostPhotoPage}/>
              <Route exact path="/viewpost/:postId" component={ViewPost}/>
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
    currentTab: state.currentTab,
    token:state.token
  }
};

export default withRouter(connect(
    mapStateToProps
)(App));

