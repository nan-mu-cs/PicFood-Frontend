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
                        <Thumbnail source={{uri: this.props.avatar}} />
                        <Body>
                        <Text>{this.props.user}</Text>
                        <Text note>{this.props.location}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: this.props.image}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{this.props.likes}</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>{this.props.comments.length}</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text>{this.props.time}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}