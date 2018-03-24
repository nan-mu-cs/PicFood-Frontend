/**
 * Created by kai on 20/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Form,Input,Label,Item,Left,Right,Toast,Thumbnail } from 'native-base';
import {StyleSheet,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ImagePicker } from 'expo';
import network from "../network";

class RegisterPage extends Component {
    constructor(props, context){
        super(props);
        this.state={
            username:"",
            password:"",
            email:"",
            avatar:"",
            error:false
        };
        this.handleClickRegister = this.handleClickRegister.bind(this);
        this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    }
    handleUploadAvatar(){
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
        }).then((result)=>{
            // console.log(result);
            if (result.cancelled) {
                return;
            }
            network.storage.uploadFile(result.uri)
                .then(res=>res.text())
                .then((res)=>{
                    // console.log(res);
                    this.setState({
                        avatar:res
                    });
                }).catch((err)=>{
                    console.log(err);
                });
        });
    }
    handleClickRegister(){
        // console.log(this.state);
        network.account.register({email: this.state.email, password: this.state.password,name:this.state.username,avatar:this.state.avatar})
            .then(response=>response.json())
            .then(res=>{
                this.props.dispatch({type:"UPDATE_TOKEN",data:res.token});
                this.props.history.push("/");
            }).catch(error=>{
                this.setState({
                    error:true
                });
                console.log(error);
            });
    }
    render() {
        let avatar;
        if(this.state.avatar)
            avatar = <Thumbnail large  source={{uri: this.state.avatar}} style={{alignSelf:"center",marginTop:20}} />;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>{this.props.history.goBack()}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Register</Title>
                    </Body>
                    <Right />
                </Header>
                <Container style={{flexDirection:"column",justifyContent:"center"}}>
                    <Form>
                        {!this.state.avatar&&<Button style={{ backgroundColor: '#5067FF',alignSelf:"center",marginTop:30 }} onPress={this.handleUploadAvatar}>
                                <Text>Upload Avatar</Text>
                            </Button>}
                        {avatar}
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input value={this.state.username} onChangeText={(val)=>this.setState({username:val})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input value={this.state.email} onChangeText={(val)=>this.setState({email:val})}/>
                        </Item>
                        <Item floatingLabel >
                            <Label >Password</Label>
                            <Input secureTextEntry value={this.state.password} onChangeText={(val)=>this.setState({password:val})}/>
                        </Item>
                    </Form>
                    <Container style={{flexDirection:"row",marginTop:30}}>
                        {/*<Button primary block style={{flex:1,marginLeft:5,marginRight:5}}>*/}
                            {/*<Text>Login</Text>*/}
                        {/*</Button>*/}
                        <Button success block style={{flex:1,marginLeft:5,marginRight:5}} onPress={this.handleClickRegister}>
                            <Text>Register</Text>
                        </Button>
                        {this.state.error && Toast.show({
                            text: 'Unable to register, please try back later',
                            position: 'bottom',
                            buttonText: 'Okay'
                        })
                        }
                    </Container>
                </Container>
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
)(RegisterPage));

// export default RegisterPage;