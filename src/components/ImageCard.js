/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class ImageCard extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'Image URL'}} />
                        <Body>
                        <Text>Kai</Text>
                        <Text note>HHH</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: 'http://via.placeholder.com/350x150'}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>4</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}