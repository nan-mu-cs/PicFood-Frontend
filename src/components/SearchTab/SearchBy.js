/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, ListItem,Left, Body,
     Card, CardItem, List, Title, Right, Picker, Form, Item as FormItem } from 'native-base';
import {Platform, StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";

const Item = Picker.Item;

class SearchBy extends Component {
    constructor(props, context){
        super(props);
        this.state={
            selected1: "key0",
            selected2: "key1"
        };
    }

    onValueChange1(value: string) {
      this.setState({
        selected1: value
      });
    }

    onValueChange2(value: string) {
      this.setState({
        selected2: value
      });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                      <Button transparent onPress={() => this.props.history.push(`/search`)}>
                        <Icon name="arrow-back" />
                      </Button>
                    </Left>
                    <Body>
                      <Title>Search Criteria</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                  <List>
                    <ListItem itemDivider style = {styles.distance}>
                      <Text>Distance</Text>
                    </ListItem>
                  </List>
                  <Form>
                    <Picker
                      mode="dropdown"
                      headerStyle={{ backgroundColor: "#b95dd3" }}
                      headerBackButtonTextStyle={{ color: "#fff" }}
                      headerTitleStyle={{ color: "#fff" }}
                      selectedValue={this.state.selected1}
                      onValueChange={this.onValueChange1.bind(this)}
                    >
                      <Item label="<2 miles" value="key0" />
                      <Item label="2-5 miles" value="key1" />
                      <Item label="5-10 miles" value="key2" />
                      <Item label="10-15 miles" value="key3" />
                      <Item label=">15 miles" value="key4" />
                    </Picker>
                  </Form>

                  <List>
                    <ListItem itemDivider style = {styles.sortby}>
                      <Text>Sort By</Text>
                    </ListItem>
                  </List>
                  <Form>
                      <Picker
                        mode="dropdown"
                        headerStyle={{ backgroundColor: "#b95dd3" }}
                        headerBackButtonTextStyle={{ color: "#fff" }}
                        headerTitleStyle={{ color: "#fff" }}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Item label="Distance" value="key0" />
                        <Item label="Rating" value="key1" />
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
    return{
        
    }
};

export default connect(
    mapStateToProps
)(SearchBy);