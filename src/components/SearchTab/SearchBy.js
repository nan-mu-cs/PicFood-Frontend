/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, {Component} from 'react';
import {
  Container, Header, Content, Button, Text, Icon, ListItem, Left, Body,
  Card, CardItem, List, Title, Right, Picker, Form, Item as FormItem
} from 'native-base';
import {Platform, StyleSheet, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";

const Item = Picker.Item;

class SearchBy extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  onValueChange1(value: string) {
    // console.log("selected1 = " + this.props.selected1);
    // console.log("selected2 = " + this.props.selected2);
    // console.log("value = " + value);
    this.props.dispatch({type: "SORT_CRITERIA", data: {distance: value, sort_by: this.props.sort_by}});
  }

  onValueChange2(value: string) {
    // console.log("selected1 = " + this.props.selected1);
    // console.log("selected2 = " + this.props.selected2);
    // console.log("value = " + value);
    this.props.dispatch({type: "SORT_CRITERIA", data: {distance: this.props.distance, sort_by: value}});
  }

  render() {
    // console.log("distance = " + this.props.distance);
    // console.log("sort_by = " + this.props.sort_by);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Search Criteria</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <List>
            <ListItem itemDivider style={styles.distance}>
              <Text>Distance</Text>
            </ListItem>
          </List>
          <Form>
            <Picker
              mode="dropdown"
              headerStyle={{backgroundColor: "#b95dd3"}}
              headerBackButtonTextStyle={{color: "#fff"}}
              headerTitleStyle={{color: "#fff"}}
              selectedValue={this.props.distance}
              onValueChange={this.onValueChange1.bind(this)}
            >
              <Item label="<2 kilometers" value="key0"/>
              <Item label="2-5 kilometers" value="key1"/>
              <Item label="5-10 kilometers" value="key2"/>
              <Item label="10-15 kilometers" value="key3"/>
              <Item label=">15 kilometers" value="key4"/>
            </Picker>
          </Form>

          <List>
            <ListItem itemDivider style={styles.sortby}>
              <Text>Sort By</Text>
            </ListItem>
          </List>
          <Form>
            <Picker
              mode="dropdown"
              headerStyle={{backgroundColor: "#b95dd3"}}
              headerBackButtonTextStyle={{color: "#fff"}}
              headerTitleStyle={{color: "#fff"}}
              selectedValue={this.props.sort_by}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Distance" value="distance"/>
              <Item label="Rate" value="rate"/>
            </Picker>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  distance: {
    marginTop: 50
  },

  sortby: {
    marginTop: 40
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    distance: state.sort_criteria.distance,
    sort_by: state.sort_criteria.sort_by,
  }
};

export default connect(
  mapStateToProps
)(SearchBy);