/**
 * Created by Xiaoxin on 24/03/2018.
 */

import React, {Component} from 'react';
import {Body, CardItem, Container, Content, Header, Icon, Text, Title} from 'native-base';
import {Image, StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';

class DishPhoto extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Body>
          <Title style={{color: 'white'}}>{this.props.restaurant.name}</Title>
          </Body>
        </Header>
        <Content>
          <CardItem cardBody>
            <Image source={{cache: 'force-cache', uri: this.props.restaurant.avatar}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem cardBody>
            <TouchableWithoutFeedback onPress={this.handleClickImage}>
              <Body style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
              <Text note><Icon style={{color: 'white'}} name="md-heart" style={{fontSize: 15}}/> Liked dish <Text
                style={{marginLeft: 5}}>{this.props.restaurant.name}</Text></Text>
              </Body>
            </TouchableWithoutFeedback>
          </CardItem>
        </Content>
        {/*<Footer/>*/}
      </Container>
    )
  }
}

const styles = StyleSheet.create({});


const mapStateToProps = (state, ownProps) => {
  return {
    restaurant: state.restaurant
  }
};

export default connect(
  mapStateToProps
)(DishPhoto);