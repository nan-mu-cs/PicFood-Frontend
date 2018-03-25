/**
 * Created by kai on 07/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Thumbnail } from 'native-base';
import {StyleSheet,ScrollView,Dimensions,Image,View,TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import ImageCard from "./Timeline/PostCard";
import Footer from "./Footer";
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class PersonalPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
        this.handleClickImage = this.handleClickImage.bind(this);
    }

    handleClickImage(item){
        // console.log("click");
        this.props.history.push({
            pathname: "/image-detail",
            state:{
                avatar:this.props.user.avatar,
                user:this.props.user.name,
                location:item.location,
                image:item.image,
                comments: item.comments
            }
        });
    }
    render() {
        let images = [];
        for(let i = 0;i<this.props.user.images.length;i+= 3){
            let card1 = (
                <Col>
                    <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,this.props.user.images[i])}>
                        <Thumbnail square  source={{ uri: this.props.user.images[i].image }}  style={styles.photoItem} />
                    </TouchableWithoutFeedback>
                </Col>
            );
            let card2,card3;
            if(i+1<this.props.user.images.length)
                card2 = (
                    <Col>
                        <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,this.props.user.images[i+1])}>
                            <Thumbnail square  source={{ uri: this.props.user.images[i+1].image }}  style={styles.photoItem} />
                        </TouchableWithoutFeedback>
                    </Col>
                );
            if(i+2<this.props.user.images.length)
                card3 = (
                    <Col>
                        <TouchableWithoutFeedback onPress={this.handleClickImage.bind(this,this.props.user.images[i+2])}>
                            <Thumbnail square  source={{ uri: this.props.user.images[i+2].image }}  style={styles.photoItem} />
                        </TouchableWithoutFeedback>
                    </Col>
                );
            images.push(
                <Row style={{height:150}} key={this.props.user.images[i].id}>
                    {card1}
                    {card2}
                    {card3}
                </Row>
            );
        }
        // console.log(this.props);
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.user.name}</Title>
                    </Body>
                </Header>
                <Grid>
                    <Row size={15} style={{alignItems:"center"}}>
                        <Col size={6}>
                            <Thumbnail round size={350} source={{ uri: this.props.user.avatar }} />
                        </Col>
                        <Col size={7}>
                            <Row style={{alignItems:"center"}}>
                                <Col size={3}>
                                    <Text>{this.props.user.posts}</Text>
                                    <Text>posts</Text>
                                </Col>
                                <Col size={3}>
                                    <Text>{this.props.user.followers}</Text>
                                    <Text>followers</Text>
                                </Col>
                                <Col size={3}>
                                    <Text>{this.props.user.following}</Text>
                                    <Text>following</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row size={85}>
                        <Col>
                            <ScrollView style={styles.photoContainer} >
                                {/*<Row style={{height:150}}>*/}
                                    {/*<Col>*/}
                                        {/*<Thumbnail square  source={{ uri: this.props.user.avatar }}  style={styles.photoItem}/>*/}
                                    {/*</Col>*/}
                                    {/*<Col>*/}
                                        {/*<Thumbnail square  source={{ uri: this.props.user.avatar }}  style={styles.photoItem}/>*/}
                                    {/*</Col>*/}
                                    {/*<Col>*/}
                                        {/*<Thumbnail square  source={{ uri: this.props.user.avatar }}  style={styles.photoItem}/>*/}
                                    {/*</Col>*/}
                                {/*</Row>*/}
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
        user:state.user
    }
};

export default withRouter(connect(
    mapStateToProps
)(PersonalPage));