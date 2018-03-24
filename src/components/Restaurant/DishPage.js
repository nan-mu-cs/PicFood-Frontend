/**
 * Created by jin on 19/03/2018.
 */

import React, {Component} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Text,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Title
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Footer from "../Footer";
import StarRating from 'react-native-star-rating';

class DishPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};

    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickBack() {
    this.props.history.goBack();
  }

  onDishPhotoPress(imgId) {
    this.props.history.push(`/dishphoto/${imgId}`);
  }

  render() {
    let photos = this.props.dish.photos.map(item =>
      <CardItem key={item.imgId} onPress={this.onDishPhotoPress.bind(this,item.imgId)}>
      <Image source={{uri: item.imgUrl}} style={{height: 200, width: null, flex: 1}}/>
      </CardItem>
    );
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Dish</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Text style={styles.dishName}>{this.props.dish.name}</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.props.dish.rate}
            containerStyle={{marginTop: 3, alignSelf: "center"}}
            fullStarColor={"#f5af4b"}
            emptyStarColor={"#f5af4b"}
            halfStarEnabled
            starSize={15}
          />
          <Text style={styles.restaurant}>{this.props.dish.restaurant}</Text>
          <List>
            {photos}
          </List>
        </Content>
        <Footer/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  dishName: {
    paddingTop: 10,
    textAlign: 'center',
  },
  restaurant: {
    paddingTop: 10,
    fontSize: 17,
    textAlign: 'center',
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    dish: state.dish
  }
};

export default connect(
  mapStateToProps
)(DishPage);