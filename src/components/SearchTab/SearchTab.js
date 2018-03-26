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
  Title
} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RestaurantCard from "./RestaurantCard";
import DishCard from "./DishCard";
import Footer from "../Footer";
import {withRouter} from 'react-router-native';
import network from '../../network';

class SearchTab extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true
    };
  }

  onSortPress = () => {
    this.props.history.push(`/searchby`);
  }

  onSubmitEditing() {
    network.restaurant.searchRestaurants(this.state.keyword, 'rate', 41, -71)
      .then(res => {
        console.log('searchRestaurants', res);
        this.props.dispatch({type:"GET_SEARCHED_RESTAURANTS", data: res});
      })
      .catch(err => {
        console.log(err)
      });
    // network.dish.searchDishes(this.state.keyword, 'rate', 41, -71)
    //   .then(res => {
    //     this.props.dispatch({type:"GET_SEARCHED_DISHES", data: res.splice(0, 8)});
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
  }

  componentDidMount() {
    if(this.props.searchedRestaurants.length === 0)
      network.restaurant.getRestaurantsByLocation(this.props.location.lat, this.props.location.lon)
        .then(res => {
          this.props.dispatch({type:"GET_SEARCHED_RESTAURANTS", data: res.splice(0, 8)});
          this.setState({loading: false})
        })
        .catch(err => {
          console.log(err)
        });
    else
      this.setState({loading: false});
    // network.dish.searchDishes('rice', 'rate', this.props.location.lat, this.props.location.lon)
    if(this.props.searchedDishes.length === 0)
      network.dish.searchDishes('', 'rate', 41, -71)
        .then(res => {
          this.props.dispatch({type:"GET_SEARCHED_DISHES", data: res.splice(0, 8)});
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
    console.log(this.props.searchedDishes);
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
                {this.state.loading ? <Spinner/> : restaurantCards}
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