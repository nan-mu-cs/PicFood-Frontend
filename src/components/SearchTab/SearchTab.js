/**
 * Created by Chaofeng on 18/03/2018.
 */
import React, {Component} from 'react';
import {
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Spinner,
  Tab,
  Tabs,
  Text,
  View
} from 'native-base';
import {ListView, RefreshControl, StatusBar, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RestaurantCard from "./RestaurantCard";
import DishCard from "./DishCard";
import {withNavigation} from 'react-navigation';
import network from '../../network';
import {Location} from "expo";

class SearchTab extends Component {
  constructor(props, context) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      searchedRestaurantsData: this.ds.cloneWithRows([]),
      searchedDishesData: this.ds.cloneWithRows([]),
      loading: true,
      refreshing: false
    };
  }

  onSortPress = () => {
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

    let restaurants = this.state.keyword ?
      network.restaurant.searchRestaurants(this.state.keyword, this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, range) :
      network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon);
    restaurants.then(res => {
      this.setState({
        refreshing: false,
        searchedRestaurantsData: this.ds.cloneWithRows(res),
      });
    })
      .catch(err => {
        console.log(err)
      });
    network.dish.searchDishes(this.state.keyword || '', this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, range)
      .then(res => {
        console.log('searchDish', res);
        this.setState({
          refreshing: false,
          searchedDishesData: this.ds.cloneWithRows(res)
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  async componentDidMount() {
    let location = await Location.getCurrentPositionAsync();
    this.props.dispatch({type: "GET_LOCATION", data: {lat: location.coords.latitude, lon: location.coords.longitude}});
    network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon)
      .then(res => {
        this.setState({
          loading: false,
          searchedRestaurantsData: this.ds.cloneWithRows(res),
        })
      })
      .catch(err => {
        console.log(err)
      });

    network.dish.searchDishes('', this.props.sort_criteria.sort_by, this.props.location.lat, this.props.location.lon, 10000)
      .then(res => {
        this.setState({
          searchedDishesData: this.ds.cloneWithRows(res)
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderRestaurantCards() {
    if (this.state.loading) {
      return <Spinner color='black'/>;
    }
    if (this.state.searchedRestaurantsData._cachedRowCount === 0) {
      return (<View style={styles.notFoundText}><Text>Restaurants Not Found</Text></View>);
    }

    return (
      <ListView
        dataSource={this.state.searchedRestaurantsData}
        renderRow={(item) =>
          <ListItem key={item.dishId} style={styles.listItem}>
            <RestaurantCard data={item}/>
          </ListItem>
        }
        pageSize={10}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
        onEndReached={() => console.log("reach end!!!")}
      >
      </ListView>
    );
  }

  renderDishCards() {
    if (this.state.loading) {
      return <Spinner color='black'/>;
    }
    if (this.state.searchedDishesData._cachedRowCount === 0) {
      return (<View style={styles.notFoundText}><Text>Dishes Not Found</Text></View>);
    }

    return (
      <ListView
        dataSource={this.state.searchedDishesData}
        renderRow={(item) =>
          <ListItem key={item.dishId} style={styles.listItem}>
            <DishCard data={item}/>
          </ListItem>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
        onEndReached={() => console.log("reach end!!!")}
      >
      </ListView>
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar hasTabs rounded style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Item>
            <Icon style={{color: 'white'}} name="ios-search"/>
            <Input
              placeholder="Search by name"
              onChangeText={(value) => this.setState({keyword: value})}
              onSubmitEditing={this.onSubmitEditing.bind(this)}/>
          </Item>
          <Button transparent onPress={this.onSortPress}>
            <Icon name='ios-menu' style={{color: 'white', marginLeft: 4, marginRight: 7}}/>
          </Button>
        </Header>
        <Tabs initialPage={0} tabBarUnderlineStyle={{backgroundColor: '#b03f55'}}>
          <Tab heading="Restaurants" tabStyle={{backgroundColor: '#D8485D'}}
               activeTabStyle={{backgroundColor: '#D8485D'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
               textStyle={{color: '#fff', fontWeight: 'normal'}}
          >
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
          <Tab heading="Dishes" tabStyle={{backgroundColor: '#D8485D'}} activeTabStyle={{backgroundColor: '#D8485D'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
               textStyle={{color: '#fff', fontWeight: 'normal'}}>
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
    location: state.location,
    sort_criteria: state.sort_criteria,
  }
};

export default withNavigation(connect(
  mapStateToProps
)(SearchTab));