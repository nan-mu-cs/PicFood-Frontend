/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem } from 'native-base';
import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import ImageCard from "./ImageCard";
import Footer from "./Footer";
import { withRouter } from 'react-router-native';

class Timeline extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        let cards = this.props.timelines.map((item)=>{
            return (
                <ListItem key={item.id}>
                    <ImageCard  {...item}/>
                </ListItem>
            );
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>PicFood</Title>
                    </Body>
                </Header>
                <List dataArray={this.props.timelines}
                      renderRow={(item) =>
                          <ListItem style={styles.listItem}>
                              <ImageCard  data={item}/>
                          </ListItem>
                      }>
                </List>
                <Footer/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        borderColor:"transparent"
    }
});


const mapStateToProps = (state, ownProps) => {
    return{
        timelines:state.timelines
    }
};

export default withRouter(connect(
    mapStateToProps
)(Timeline));