/**
 * Created by kai on 10/03/2018.
 */
import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withRouter } from 'react-router-native';
import network from "../../network";
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
    componentDidMount(){
        network.account.getUserAccount({userId:this.props.data.commenterId})
            .then((res)=>res.json())
            .then(data=>{
                this.setState({
                    avatar,name
                });
                console.log(data);
            }).catch(err=>{
            console.log(err);
        });
        network.post.getPostInfo(this.props.data.postId)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            }).catch(err=>{
                console.log(err);
        });
        // network.dish.getDishInfoById({id:this.props.data.dishId})
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(data);
        //     }).catch(err=>{
        //     console.log(err);
        // })
    }
    render() {
        let avatar = this.state.avatar;
        if(!avatar)
            avatar = "http://via.placeholder.com/100x100";
        let name = this.state.name;
        if(!name)
            name = "PlaceHolder Name";
        // console.log(this.props);
        return (
            <Card style={{borderColor:"transparent",shadowColor:"transparent"}}>
                <CardItem>
                    <Left>
                        <Thumbnail small source={{uri: avatar}} />
                        <Body>
                        <Text style={{fontSize:16}}>{name}</Text>
                        {/*<Text note style={{fontSize:14}}>{this.props.data.location}</Text>*/}
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody >
                    <TouchableWithoutFeedback onPress={this.handleClickImage}>
                        <Body style={{paddingTop:5,paddingBottom:20,paddingLeft:20,paddingRight:20}}>
                        <Text note><Icon ios="ios-quote" android="quote" style={{fontSize:35}} />    Comment on dish <Text style={{marginLeft:10}}>{this.props.data.dish}</Text>:</Text>
                            <Text style={{marginTop:5,marginLeft:10}}>{this.props.data.content}</Text>
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