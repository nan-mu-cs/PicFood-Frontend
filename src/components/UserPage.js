/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon, ListItem,Left, Body,
     Card, CardItem, List, Title, Right } from 'native-base';
import {StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import Dishes from "./Dishes";
import FollowList from "./Users/FollowList"
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./Footer"
import StarRating from 'react-native-star-rating';

class UserPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    onForwardPress = () => {
        this.props.history.push(`/followers`);
    }

    render() {
        // let img = this.props.user.images.map((item)=>{
        //     let images;

        //     images = <Images data={item}/>;
        //     return (
        //         <ListItem key={item.id} style={styles.listItem}>
        //             {images}
        //         </ListItem>
        //     );
        // });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.user.name}</Title>
                    </Body>
                </Header>
                <Content>
                  <CardItem cardBody>
                    <Image source={{uri:this.props.user.avatar}} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <List>
                    <ListItem itemHeader first>
                      <Text>{this.props.user.name}</Text>
                    </ListItem>
                    <ListItem last>
                      <Text>{this.props.user.posts} Posts</Text>
                    </ListItem>
                    
                    <ListItem itemHeader>
                      <Text>{this.props.user.followers} Followers</Text>
                      <Right>
                      <Button small onPress={this.onForwardPress}>
                        <Icon name='arrow-forward' />
                      </Button>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Text>{this.props.user.following} Following</Text>
                    </ListItem>
                  </List>
                </Content>
                <Footer/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
});


const mapStateToProps = (state, ownProps) => {
    return{
        user:state.user
    }
};

export default connect(
    mapStateToProps
)(UserPage);