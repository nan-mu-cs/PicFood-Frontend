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
  Tab,
  Tabs,
  Title
} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RestaurantCard from "./RestaurantCard";
import DishCard from "./DishCard";
import Footer from "../Footer";
import {withRouter} from 'react-router-native';
import network from '../../network';


const BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class SearchTab extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  onSortPress = () => {
  }

  onSubmitEditing() {
    network.restaurant.searchRestaurants(this.state.keyword)
      .then(res => {
        console.log(res)
        this.props.dispatch({type:"GET_SEARCHED_RESTAURANTS", data: res});
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    // console.log('lat', this.props.location.lat);
    network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon)
      .then(res => {
        console.log(res)
        this.props.dispatch({type:"GET_SEARCHED_RESTAURANTS", data: res});
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let restaurantCards = this.props.searchedRestaurants.map(item =>
      <ListItem key={item.restaurantId} style={styles.listItem}>
        <RestaurantCard data={item}/>
      </ListItem>
    );
    let dishCards = this.props.searchedDishes.map(item =>
      <ListItem key={item.dishId} style={styles.listItem}>
        <DishCard data={item}/>
      </ListItem>
    );

    return (
      <Container>
        <Header searchBar hasTabs rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input
              placeholder="Search"
              onChangeText={(value) => this.setState({keyword: value})}
              onSubmitEditing={this.onSubmitEditing.bind(this)}/>
          </Item>
          <Button transparent onPress={this.onSortPress}>
            <Icon name='ios-menu'/>
          </Button>
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="Restaurants">
            <Content>
              <List>
                {restaurantCards}
              </List>
            </Content>
          </Tab>
          <Tab heading="Dishes">
            <Content>
              <List>
                {dishCards}
              </List>
            </Content>
          </Tab>
        </Tabs>
        <Footer/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    searchedRestaurants: state.searchedRestaurants,
    searchedDishes: state.searchedDishes,
    location: state.location,
  }
};

export default withRouter(connect(
  mapStateToProps
)(SearchTab));