/**
 * Created by kai on 23/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Fab,Left,Right,Item,Input,Label } from 'native-base';
import {StyleSheet,Image} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import StarRating from 'react-native-star-rating';
import network from "../network";
// import Autocomplete from "react-native-autocomplete-input";

class PostPhotoPage extends Component {
    constructor(props, context){
        super(props);
        this.state={
            avatar:"",
            dishname:"",
            rate:0,
            comment:"",
            category:""
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickPost = this.handleClickPost.bind(this);
    }
    handleClickBack(){
        this.props.history.goBack();
    }
    handleClickPost(){
        console.log(this.state);
    }
    componentDidMount(){
        network.storage.uploadFile(this.props.location.state.image)
            .then((response)=>response.text())
            .then(url=>{
                this.setState({avatar:url});
            }).catch(err=>{
                console.log(err);
            });
    }
    render() {
        //console.log(this.props.location.state.image);
        //let {image} = this.props.location.state;
        let data  = ["React","Native","Android","Java","Hello World"];
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
                <Row size={1}>
                    <Col>
                        <Item floatingLabel>
                            <Label>Dish name</Label>
                            <Input value={this.state.dishname} onChangeText={(val)=>this.setState({dishname:val})} />
                        </Item>
                    </Col>
                </Row>
                <Row size={1} style={{justifyContent:"center"}}>
                    <Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.rate}
                            containerStyle={{alignSelf:"center"}}
                            fullStarColor={"#f5af4b"}
                            emptyStarColor={"#f5af4b"}
                            halfStarEnabled
                            starSize={25}
                            selectedStar={(rate) => this.setState({rate})}
                        />
                    </Col>
                </Row>
                <Row size={1} style={{justifyContent:"center"}}>
                    <Col>
                        <Item floatingLabel>
                            <Label>Comment</Label>
                            <Input value={this.state.comment} onChangeText={(val)=>this.setState({comment:val})} />
                        </Item>
                    </Col>
                </Row>
                <Row size={8} >
                    <Col>
                        {this.props.location.state.image && <Image source={{uri: this.props.location.state.image}} style={{height:300}} />}
                    </Col>
                </Row>
                <Row size={2}>
                    <Col size={2}>
                        <Button success block onPress={this.handleClickPost}>
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