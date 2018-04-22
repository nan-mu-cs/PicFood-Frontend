/**
 * Created by Chaofeng on 18/03/2018.
 */
import React, {Component} from 'react';
import {
  Button,
  Container,
  Content,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  ActionSheet,
  Input,
  Item,
  List,
  ListItem,
  Spinner,
  Tab,
  Tabs,
  Text,
  Title,
  View
} from 'native-base';
import {StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import RestaurantCard from "./RestaurantCard";
import DishCard from "./DishCard";
import Footer from "../Footer";
import { withNavigation } from 'react-navigation';
import network from '../../network';

class SearchTab extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false
    };
  }

  onSortPress = () => {
    // this.props.history.push(`/searchby`);
    this.props.navigation.navigate("SearchBy");
  };

  handleRefresh() {
    this.setState({refreshing: true});
    this.onSubmitEditing();
  }

  onSubmitEditing() {
    let range = 0;
    if (this.props.sort_criteria.distance == "key0") {
      console.log("====== Searching Restaurants within 2 kilometers =======");
      range = 2;
    }
    else if (this.props.sort_criteria.distance == "key1") {
      console.log("====== Searching Restaurants within 5 kilometers =======");
      range = 5;
    }
    else if (this.props.sort_criteria.distance == "key2") {
      console.log("====== Searching Restaurants within 10 kilometers =======");
      range = 10;
    }
    else if (this.props.sort_criteria.distance == "key3") {
      console.log("====== Searching Restaurants within 15 kilometers =======");
      range = 15;
    }
    else if (this.props.sort_criteria.distance == "key4") {
      console.log("====== Searching Restaurants further than 15 kilometers =======");
      range = 10000;
    }
    else {
      console.log("=========== Wrong Search Criteria!!! ==========");
      return;
    }

    let restaurants = this.state.keyword ? network.restaurant.searchRestaurants(this.state.keyword, this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, range) :
      network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon);
    restaurants.then(res => {
      console.log('searchRestaurants', res);
      this.props.dispatch({type: "GET_SEARCHED_RESTAURANTS", data: res.splice(0, 18)});
      this.setState({refreshing: false});
    })
      .catch(err => {
        console.log(err)
      });
    network.dish.searchDishes(this.state.keyword || '', this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, range)
      .then(res => {
        this.props.dispatch({type: "GET_SEARCHED_DISHES", data: res.splice(0, 18)});
        this.setState({refreshing: false});
      })
      .catch(err => {
        console.log(err)
      });
  }

  componentDidMount() {
    if (this.props.searchedRestaurants.length === 0)
      network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon)
        .then(res => {
          this.props.dispatch({type: "GET_SEARCHED_RESTAURANTS", data: res.splice(0, 18)});
          this.setState({loading: false})
        })
        .catch(err => {
          console.log(err)
        });
    else
      this.setState({loading: false});

    // network.dish.searchDishes('rice', 'rate', this.props.location.lat, this.props.location.lon)
    if (this.props.searchedDishes.length === 0)
      network.dish.searchDishes('', this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, 15)
        .then(res => {
          this.props.dispatch({type: "GET_SEARCHED_DISHES", data: res.splice(0, 18)});
        })
        .catch(err => {
          console.log(err)
        })
  }

  renderRestaurantCards() {
    if (this.state.loading) {
      return <Spinner color='black'/>;
    }
    if (this.props.searchedRestaurants.length === 0) {
      return (<View style={styles.notFoundText}><Text>Restaurants Not Found</Text></View>);
    }

    return (
      <List dataArray={this.props.searchedRestaurants}
            renderRow={(item) =>
              <ListItem key={item.dishId} style={styles.listItem}>
                <RestaurantCard data={item}/>
              </ListItem>
            }
      >
      </List>
    );

    // let low = 0, high = 0;
    // if (this.props.sort_criteria.distance == "key0") {
    //   console.log("====== Searching Restaurants within 2 kilometers =======");
    //   low = 0;
    //   high = 2;
    // }
    // else if (this.props.sort_criteria.distance == "key1") {
    //   console.log("====== Searching Restaurants between 2 - 5 kilometers =======");
    //   low = 2;
    //   high = 5;
    // }
    // else if (this.props.sort_criteria.distance == "key2") {
    //   console.log("====== Searching Restaurants between 5 - 10 kilometers =======");
    //   low = 5;
    //   high = 10;
    // }
    // else if (this.props.sort_criteria.distance == "key3") {
    //   console.log("====== Searching Restaurants between 10 - 15 kilometers =======");
    //   low = 10;
    //   high = 15;
    // }
    // else if (this.props.sort_criteria.distance == "key4") {
    //   console.log("====== Searching Restaurants further than 15 kilometers =======");
    //   low = 15;
    //   high = 10000;
    // }
    // else {
    //   console.log("=========== Wrong Search Criteria!!! ==========");
    //   return;
    // }
    // // let filtered_restaurants = this.props.searchedRestaurants.filter((item) => 
    // //   (item.distance >= low && item.distance <= high)
    // // ).map((item) => {
    // //     <ListItem key={item.dishId} style={styles.listItem}>
    // //       <RestaurantCard data={item}/>
    // //     </ListItem>
    // // });
    // let filtered_restaurants = this.props.searchedRestaurants.filter((item) => {
    //   //return {item.distance} >= low && {item.distance} <= high
    //   console.log("distance = " + item.distance + "   low = " + low + "   high = " + high);
    //   console.log(item.distance >= low);
    //   console.log(item.distance <= high);
    //   if (item.distance >= low && item.distance <= high) return true
    // }).map((item) => {
    //   return (
    //       <ListItem key={item.restaurantId} style={styles.listItem}>
    //         <RestaurantCard data={item}/>
    //       </ListItem>
    //     )
    // });
    // return (
    //   <List>
    //     {filtered_restaurants}
    //   </List>
    // );
  }

  renderDishCards() {
    if (this.state.loading) {
      return <Spinner color='black'/>;
    }
    if (this.props.searchedDishes.length === 0) {
      return (<View style={styles.notFoundText}><Text>Dishes Not Found</Text></View>);
    }

    return (
      <List dataArray={this.props.searchedDishes}
            renderRow={(item) =>
              <ListItem key={item.dishId} style={styles.listItem}>
                <DishCard data={item}/>
              </ListItem>
            }
      >
      </List>
    );

    // let low = 0, high = 0;
    // if (this.props.sort_criteria.distance == "key0") {
    //   console.log("====== Searching Dishes within 2 kilometers =======");
    //   low = 0;
    //   high = 2;
    // }
    // else if (this.props.sort_criteria.distance == "key1") {
    //   console.log("====== Searching Dishes between 2 - 5 kilometers =======");
    //   low = 2;
    //   high = 5;
    // }
    // else if (this.props.sort_criteria.distance == "key2") {
    //   console.log("====== Searching Dishes between 5 - 10 kilometers =======");
    //   low = 5;
    //   high = 10;
    // }
    // else if (this.props.sort_criteria.distance == "key3") {
    //   console.log("====== Searching Dishes between 10 - 15 kilometers =======");
    //   low = 10;
    //   high = 15;
    // }
    // else if (this.props.sort_criteria.distance == "key4") {
    //   console.log("====== Searching Dishes further than 15 kilometers =======");
    //   low = 15;
    //   high = 10000;
    // }
    // else {
    //   console.log("=========== Wrong Search Criteria!!! ==========");
    //   return;
    // }
    // let filtered_dishes = this.props.searchedDishes.filter((item) => {
    //   console.log("distance = " + item.distance + "   low = " + low + "   high = " + high);
    //   console.log(item.distance >= low);
    //   console.log(item.distance <= high);
    //   if (item.distance >= low && item.distance <= high) return true
    // }).map((item) => {
    //   return (
    //       <ListItem key={item.dishId} style={styles.listItem}>
    //         <DishCard data={item}/>
    //       </ListItem>
    //     )
    // });
    // return (
    //   <List>
    //     {filtered_dishes}
    //   </List>
    // );
  }

  render() {
    return (
      <Container>
        <Header searchBar hasTabs rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input
              placeholder="Search by name"
              onChangeText={(value) => this.setState({keyword: value})}
              onSubmitEditing={this.onSubmitEditing.bind(this)}/>
          </Item>
          <Button transparent onPress={this.onSortPress}>
            <Icon name='ios-menu' style={{marginLeft: 4, marginRight: 7}}/>
          </Button>
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="Restaurants">
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              }
            >
              {this.renderRestaurantCards()}
            </Content>
          </Tab>
          <Tab heading="Dishes">
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              }
            >
              {this.renderDishCards()}
            </Content>
          </Tab>
        </Tabs>
        {/*<Footer/>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0,
    paddingTop: 3,
    paddingBottom: 0,
  },
  notFoundText: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    searchedRestaurants: state.searchedRestaurants,
    searchedDishes: state.searchedDishes,
    location: state.location,
    sort_criteria: state.sort_criteria,
  }
};

export default withNavigation(connect(
  mapStateToProps
)(SearchTab));