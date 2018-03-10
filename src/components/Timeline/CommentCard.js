/**
 * Created by kai on 10/03/2018.
 */
import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withRouter } from 'react-router-native';

class CommentCard extends Component {
    constructor(props,context){
        super(props);
        this.state = {};
        this.handleClickImage = this.handleClickImage.bind(this);
    }
    handleClickImage(){
        //console.log("click");
        // this.props.history.push({
        //     pathname: "/image-detail",
        //     state:{
        //         avatar:this.props.data.avatar,
        //         user:this.props.data.user,
        //         location:this.props.data.location,
        //         image:this.props.data.image,
        //         comments: this.props.data.comments
        //     }
        // });
    }
    render() {
        // console.log(this.props);
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.props.data.avatar}} />
                        <Body>
                        <Text>{this.props.data.user}</Text>
                        <Text note>{this.props.data.location}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody >
                    <TouchableWithoutFeedback onPress={this.handleClickImage}>
                        <Body>
                            <Text>Comment on dish {this.props.data.dish}:</Text>
                            <Text>{this.props.data.comment}</Text>
                        </Body>
                    </TouchableWithoutFeedback>
                </CardItem>
                {/*<CardItem>*/}
                {/*<Left>*/}
                {/*<Button transparent>*/}
                {/*<Icon active name="thumbs-up" />*/}
                {/*<Text>{this.props.data.likes}</Text>*/}
                {/*</Button>*/}
                {/*</Left>*/}
                {/*<Body>*/}
                {/*<Button transparent>*/}
                {/*<Icon active name="chatbubbles" />*/}
                {/*<Text>{this.props.data.comments.length}</Text>*/}
                {/*</Button>*/}
                {/*</Body>*/}
                {/*<Right>*/}
                {/*<Text>{this.props.data.time}</Text>*/}
                {/*</Right>*/}
                {/*</CardItem>*/}
            </Card>
        );
    }
}

export default withRouter(CommentCard);