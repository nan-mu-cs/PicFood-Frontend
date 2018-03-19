/**
 * Created by jin on 19/03/2018.
 */

import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base';
import {withRouter} from "react-router-native";
export default class Dishes extends Component {
    render() {

        return (
            <Card style={{borderColor:"transparent"}}>

                <CardItem>
                    <Left>
                        <Body>
                        <Text>{this.props.data.name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody >
                    <TouchableWithoutFeedback onPress={this.handleClickImage}>
                        {/*<Image source={{uri:this.props.data.avatar1}} style={{height: 20, width: null, flex: 1}}/>*/}
                        {/*<Image source={{uri:this.props.data.avatar2}} style={{height: 20, width: null, flex: 1}}/>*/}
                        {/*<Image source={{uri:this.props.data.avatar3}} style={{height: 20, width: null, flex: 1}}/>*/}
                        {/*<Image source={{uri:this.props.data.avatar4}} style={{height: 20, width: null, flex: 1}}/>*/}
                        {/*<Image source={{uri:this.props.data.avatar5}} style={{height: 20, width: null, flex: 1}}/>*/}
                    </TouchableWithoutFeedback>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        borderColor:"transparent"
    }
});
export default withRouter(Dishes);