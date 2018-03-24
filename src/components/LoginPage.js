/**
 * Created by kai on 20/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Form,Input,Label,Item,Toast } from 'native-base';
import {StyleSheet,ScrollView,AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import network from "../network";

class LoginPage extends Component {
    constructor(props, context){
        super(props);
        this.state={
            email:"",
            password:"",
            error:false

        };
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(){
        // console.log(this.refs)
        // console.log(this.state);
        // console.log(this.state);
        AsyncStorage.multiSet([["email",this.state.email],["password",this.state.password]],(err) => {
            if(err){
                console.log(err);
                return;
            }
            network.account.login({email: this.state.email, password: this.state.password})
                .then(response=>response.json())
                .then((res) => {
                    //res = res.json();
                    //console.log(res);
                    if(!res.token){
                        this.setState({
                            error:true
                        });
                        return ;
                    }
                    // console.log(res);
                    // console.log(res._bodyInit);
                    this.props.dispatch({type:"UPDATE_TOKEN",data:res.token});
                    this.props.history.push("/");
                })
                .catch((e) => {
                    this.setState({
                        error:true
                    });
                    console.log("ERR"+e.message);
                });
        });
    }
    componentDidMount() {

    }
    render() {
       return (
           <Container>
               <Header>
                   <Body>
                    <Title>Login</Title>
                   </Body>
               </Header>
               <Container style={{flexDirection:"column",justifyContent:"center"}}>
                   <Form>
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
                    <Button primary block style={{flex:1,marginLeft:5,marginRight:5}} onPress={this.handleLogin}>
                        <Text>Login</Text>
                    </Button>
                    <Button success block style={{flex:1,marginLeft:5,marginRight:5}} onPress={()=>{this.props.history.push("/register")}}>
                        <Text>Register</Text>
                    </Button>
                       {this.state.error && Toast.show({
                           text: 'Wrong email or password!',
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


// const mapStateToProps = (state, ownProps) => {
//     return{
//     }
// };
//
export default withRouter(connect(
)(LoginPage));

// export default withRouter(LoginPage);