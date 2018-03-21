/**
 * Created by kai on 20/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Form,Input,Label,Item,Left,Right } from 'native-base';
import {StyleSheet,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class RegisterPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
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
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input ref={(input)=>this.username=input}/>
                        </Item>
                        <Item floatingLabel >
                            <Label >Password</Label>
                            <Input secureTextEntry ref={(input)=>this.password=input}/>
                        </Item>
                    </Form>
                    <Container style={{flexDirection:"row",marginTop:30}}>
                        {/*<Button primary block style={{flex:1,marginLeft:5,marginRight:5}}>*/}
                            {/*<Text>Login</Text>*/}
                        {/*</Button>*/}
                        <Button success block style={{flex:1,marginLeft:5,marginRight:5}}>
                            <Text>Register</Text>
                        </Button>
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
// export default withRouter(connect(
//     mapStateToProps
// )(Timeline));

export default RegisterPage;