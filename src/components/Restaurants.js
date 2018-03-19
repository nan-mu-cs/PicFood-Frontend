/**
 * Created by jin on 19/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem } from 'native-base';
import {StyleSheet,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import Footer from "./Footer";
import RestaurantPage from "./RestaurantPage"
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class Restaurants extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        let restaurants = this.props.restaurants.map((item)=>{
            let restaurant;

            restaurant = <RestaurantPage data={item}/>;
            return (
                <ListItem key={item.id} style={styles.listItem}>
                    {restaurant}
                </ListItem>
            );
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Restaurants</Title>
                    </Body>
                </Header>
                <Grid>
                    <Row>
                        <Col>
                            <ScrollView>
                                <List>
                                    {restaurants}
                                </List>
                            </ScrollView>
                        </Col>
                    </Row>
                </Grid>

                <Footer/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        borderColor:"transparent",
        marginBottom:-20,
        marginTop: -17,
        marginLeft:-3,
        marginRight:-17,
    },
    listItemLast:{

    }
});


const mapStateToProps = (state, ownProps) => {
    return{
        restaurants:state.restaurants
    }
};

export default withRouter(connect(
    mapStateToProps
)(Restaurants));