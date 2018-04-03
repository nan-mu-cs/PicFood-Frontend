/**
 * Created by Xiaoxin on 21/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Left, Right, Icon,Body,Title,List, ListItem,Thumbnail } from 'native-base';
import {StyleSheet,ScrollView,Dimensions,Image,View,TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import Footer from "../Footer";
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import network from "../../network";

class UserPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      userId: this.props.match.params.id,
      name: '',
      avatar: "http://via.placeholder.com/100x100",
    };
    this.handleClickBack = this.handleClickBack.bind(this);
  }
  handleClickBack(){
    this.props.history.goBack();
  }

    componentDidMount(){
        network.social.getUserProfile(this.state.userId)
            .then(res=>res.json())
            .then(data=>{
                this.setState(data);
                // this.props.dispatch({type:"UPDATE_USER_PROFILE",data:data});
                network.account.getUserTimeline(data.userId)
                    .then(res=>res.json())
                    .then(data=>{
                        this.props.dispatch({type:"UPDATE_USER_TIMELINE",data:data});
                    }).catch(err=>{
                    console.log(err);
                })
            }).then(err=>{
            console.log(err);
        });
    }

    handleClickImage(postId){
        this.props.history.push(`/viewpost/${postId}`)
    }

    render() {
        let images = [];
        let post = [];
        for(let i = 0;i<this.props.userTimeline.length;i++) {
            if (this.props.userTimeline[i].creatorId)
                post.push(this.props.userTimeline[i]);
        }
        for(let i = 0;i<post.length;i+= 3){
            let card1 = (
                <Col>
                    <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,post[i].postId)}>
                        <Thumbnail square  source={{ uri: post[i].imageUrl || "http://via.placeholder.com/350x150" }}  style={styles.photoItem} />
                    </TouchableWithoutFeedback>
                </Col>
            );
            let card2,card3;
            if(i+1<post.length)
                card2 = (
                    <Col>
                        <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,post[i+1].postId)}>
                            <Thumbnail square  source={{ uri: post[i+1].imageUrl || "http://via.placeholder.com/350x150" }}  style={styles.photoItem} />
                        </TouchableWithoutFeedback>
                    </Col>
                );
            if(i+2<post.length)
                card3 = (
                    <Col>
                        <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,post[i+2].postId)}>
                            <Thumbnail square  source={{ uri: post[i+1].imageUrl || "http://via.placeholder.com/350x150" }}  style={styles.photoItem} />
                        </TouchableWithoutFeedback>
                    </Col>
                );
            images.push(
                <Row style={{height:150}} key={post[i].postId}>
                    {card1}
                    {card2}
                    {card3}
                </Row>
            );
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.handleClickBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{this.state.name}</Title>
                    </Body>
                    <Right />
                </Header>
                <Grid>
                    <Row size={15} style={{alignItems:"center"}}>
                        <Col size={3}>
                            <Thumbnail round size={150} source={{ uri: (this.state.avatar)||"http://via.placeholder.com/100x100" }} style={{marginLeft:30}}/>
                        </Col>
                        <Col size={7}>
                            <Row style={{alignItems:"center"}}>
                                <Col size={3}>
                                    <TouchableWithoutFeedback onPress={()=>this.props.history.push(`/followers/${this.state.userId}`)}>
                                        <Text>{this.state.fanCount||0} followers</Text>
                                    </TouchableWithoutFeedback>
                                </Col>
                                <Col size={3}>
                                    <TouchableWithoutFeedback onPress={()=>this.props.history.push(`/followings/${this.state.userId}`)}>
                                        <Text>{this.state.followCount||0} following</Text>
                                    </TouchableWithoutFeedback>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row size={85}>
                        <Col>
                            <ScrollView style={styles.photoContainer} >
                                {images}
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
    avatarContainer:{
    },
    photoContainer:{
        flexDirection:"row",
        flex:1,
        width: Dimensions.get('window').width
    },
    photoItem:{
        width: Dimensions.get('window').width / 3.1,
        height:100,
        flex:1,
        margin:1
    }
});


const mapStateToProps = (state, ownProps) => {
    return{
        user:state.user,
        userTimeline:state.userTimeline
    }
};

export default connect(
  mapStateToProps
)(UserPage);