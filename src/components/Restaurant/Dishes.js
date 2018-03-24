/**
 * Created by jin on 19/03/2018.
 */

import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base';
import {withRouter} from "react-router-native";
import StarRating from 'react-native-star-rating';

export default class Dishes extends Component {
    render() {

        return (
            <Card style={{borderBottomWidth: 0}}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style={styles.dish}>{this.props.data.name}</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.props.data.rate}
                            containerStyle={{marginTop:10,alignSelf:"center"}}
                            fullStarColor={"#f5af4b"}
                            emptyStarColor={"#f5af4b"}
                            halfStarEnabled
                            starSize={15}
                        />
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody >
                        <Image source={{uri:this.props.data.avatar1}} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
                <CardItem cardBody >
                        <Image source={{uri:this.props.data.avatar2}} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
                <CardItem cardBody >
                        <Image source={{uri:this.props.data.avatar3}} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
                <CardItem cardBody >
                        <Image source={{uri:this.props.data.avatar4}} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
                <CardItem cardBody >
                        <Image source={{uri:this.props.data.avatar5}} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
      borderColor:"transparent"
    },
    dish: {
      fontSize: 17,
      textAlign: 'center',
    }
});