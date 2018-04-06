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
    let restaurants = this.state.keyword ? network.restaurant.searchRestaurants(this.state.keyword, 'rate', 41, -71) :
      network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon);
    restaurants.then(res => {
      console.log('searchRestaurants', res);
      this.props.dispatch({type: "GET_SEARCHED_RESTAURANTS", data: res.splice(0, 18)});
      this.setState({refreshing: false});
    })
      .catch(err => {
        console.log(err)
      });
    network.dish.searchDishes(this.state.keyword || '', 'rate', 41, -71)
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
      network.dish.searchDishes('', 'rate', 41, -71)
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
  }
};

export default withNavigation(connect(
  mapStateToProps
)(SearchTab));