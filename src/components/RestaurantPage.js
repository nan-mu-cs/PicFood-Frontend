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
class RestaurantPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
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
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text>{this.props.restaurant.name}</Text>
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
                        </Col>
                    </Row>
                    {/*<Row size={1}>*/}
                        {/*<Col searchBar rounded>*/}
                            {/*<Item>*/}
                                {/*<Icon name="ios-search" />*/}
                                {/*<Input placeholder="Search" />*/}
                            {/*</Item>*/}
                            {/*<Button transparent>*/}
                                {/*<Text>Search</Text>*/}
                            {/*</Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                </Grid>
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