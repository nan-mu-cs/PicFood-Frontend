/**
 * Created by kai on 07/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Thumbnail } from 'native-base';
import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import ImageCard from "./ImageCard";
import Footer from "./Footer";
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class PersonalPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        // console.log(this.props);
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.user.name}</Title>
                    </Body>
                </Header>
                <Grid>
                    <Row size={3}>
                        <Col size={3}>
                            <Thumbnail round size={80} source={{ uri: this.props.user.avatar }} />
                        </Col>
                        <Col size={7}>
                            <Row>
                                <Col size={3}>
                                    <Row size={7}>
                                        <Text>{this.props.user.posts}</Text>
                                    </Row>
                                    <Row size={3}>
                                        <Text>posts</Text>
                                    </Row>
                                </Col>
                                <Col size={3}>
                                    <Row size={7}>
                                        <Text>{this.props.user.followers}</Text>
                                    </Row>
                                    <Row size={3}>
                                        <Text>followers</Text>
                                    </Row>
                                </Col>
                                <Col size={3}>
                                    <Row size={7}>
                                        <Text>{this.props.user.following}</Text>
                                    </Row>
                                    <Row size={3}>
                                        <Text>following</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row size={7}></Row>
                </Grid>
                <Footer/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state, ownProps) => {
    return{
        user:state.user
    }
};

export default withRouter(connect(
    mapStateToProps
)(PersonalPage));