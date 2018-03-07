/**
 * Created by kai on 06/03/2018.
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base';
export default class Comments extends Component {
    render() {
        let comments = this.props.comments.map((item)=>{
           return (
                <ListItem key={item.id}>
                    <Text>{item.user}</Text>
                    <Text>{item.comment}</Text>
                </ListItem>
           )
        });
        return (
            <Content>
                <List>
                    {comments}
                </List>
            </Content>
        );
    }
}