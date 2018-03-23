/**
 * Created by jin on 19/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, ListItem,Left, Body,
     Card, CardItem, List, Title, Right } from 'native-base';
import {StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import Dishes from "./Dishes";
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./Footer"
import StarRating from 'react-native-star-rating';

class RestaurantPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };

        this.handleClickBack = this.handleClickBack.bind(this);
    }
    handleClickBack(){
        this.props.history.goBack();
    }
    render() {
        let dish = this.props.restaurant.dishes.map((item)=>{
            let dishes;

            dishes = <Dishes data={item}/>;
            return (
                <ListItem key={item.id} style={styles.listItem}>
                    {dishes}
                </ListItem>
            );
        });
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.handleClickBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Restaurant</Title>
                    </Body>
                    <Right />
                </Header>
                <Grid>
                    <Row size={9}>
                        <Col>
                            <ScrollView>
                            <Card>

                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text>{this.props.restaurant.name}</Text>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={this.props.restaurant.rate}
                                            containerStyle={{marginTop:10,alignSelf:"center"}}
                                            fullStarColor={"#f5af4b"}
                                            emptyStarColor={"#f5af4b"}
                                            halfStarEnabled
                                            starSize={25}
                                        />
                                        <Text note>{this.props.restaurant.location}</Text>
                                        <Text note>{this.props.restaurant.address}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{uri:this.props.restaurant.avatar}} style={{height: 200, width: null, flex: 1}}/>
                                </CardItem>

                                <CardItem>
                                    <ScrollView>
                                        <List>
                                            {dish}
                                        </List>
                                    </ScrollView>
                                </CardItem>

                            </Card>
                            </ScrollView>
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
});


const mapStateToProps = (state, ownProps) => {
    return{
        restaurant:state.restaurant
    }
};

export default connect(
    mapStateToProps
)(RestaurantPage);