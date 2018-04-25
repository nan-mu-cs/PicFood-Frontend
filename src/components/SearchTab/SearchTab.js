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

  async onSubmitEditing() {
    let {sort_criteria, location} = this.props;
    let range = sort_criteria.distance;
    console.log('location', location)
    network.restaurant.searchRestaurants(this.state.keyword, sort_criteria.sort_by, location.lat, location.lon, range)
      .then(res => {
        this.setState({
          refreshing: false,
          loading: false,
          searchedRestaurantsData: this.ds.cloneWithRows(res)
        });
      })
      .catch(err => {
        console.log(err)
      });
    network.dish.searchDishes(this.state.keyword, sort_criteria.sort_by, location.lat, location.lon, range)
      .then(res => {
        console.log('res', res)
        this.setState({
          refreshing: false,
          searchedDishesData: this.ds.cloneWithRows(res)
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  componentDidMount() {
    Location.getCurrentPositionAsync({})
      .then((res) => {
        this.props.dispatch({type: "GET_LOCATION", data: {lat: res.coords.latitude, lon: res.coords.longitude}});
      }).catch(err => {
      console.log(err);
    });
    this.onSubmitEditing();
  }

  renderCards(type) {
    if (this.state.loading)
      return <Spinner color='black'/>;
    if (this.state[`searched${type}Data`]._cachedRowCount === 0)
      return <View style={styles.notFoundText}><Text>{`${type} Not Found`}</Text></View>;

    let renderRow = (item) => {
      return type === 'Restaurants' ?
        <ListItem key={item.restaurantId} style={styles.listItem}>
          <RestaurantCard data={item}/>
        </ListItem> :
        <ListItem key={item.dishId} style={styles.listItem}>
          <DishCard data={item}/>
        </ListItem>
    };

    return (
      <ListView
        dataSource={this.state[`searched${type}Data`]}
        renderRow={renderRow}
        enableEmptySections
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
        }
      />);
  }

  render() {
    const tab = (heading) => {
      return (
        <Tab heading={heading}
             tabStyle={{backgroundColor: '#D8485D'}}
             activeTabStyle={{backgroundColor: '#D8485D'}}
             activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
             textStyle={{color: '#fff', fontWeight: 'normal'}}
        >
          <View style={{flex: 1}}>
            {this.renderCards(heading)}
          </View>
        </Tab>
      );
    };

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
          {tab('Restaurants')}
          {tab('Dishes')}
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
    location: state.location_akw,
    sort_criteria: state.sort_criteria,
  }
};

export default withNavigation(connect(
  mapStateToProps
)(SearchTab));