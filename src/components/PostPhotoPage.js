/**
 * Created by kai on 23/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Fab,Left,Right } from 'native-base';
import {StyleSheet,Image} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class PostPhotoPage extends Component {
    constructor(props, context){
        super(props);
        this.state={
        };
        this.handleClickBack = this.handleClickBack.bind(this);
    }
    handleClickBack(){
        this.props.history.goBack();
    }
    render() {
        console.log(this.props.location.state.image);
        //let {image} = this.props.location.state;
        return (
            <Container>
            <Header>
                <Left>
                    <Button transparent onPress={this.handleClickBack}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Title>Post Photo</Title>
                </Body>
                <Right />
            </Header>
            <Grid>
                <Row size={6}>
                    <Col>
                        {this.props.location.state.image && <Image source={{uri: this.props.location.state.image}} style={{height:300}} />}
                    </Col>
                </Row>
                <Row size={4}>
                    <Col size={2}>
                        <Button success block>
                            <Text>Post</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
});


const mapStateToProps = (state, ownProps) => {
    return{
    }
};

export default withRouter(connect(
    mapStateToProps
)(PostPhotoPage));