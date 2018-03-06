/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import ImageCard from "./ImageCard";
class Timeline extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        return (
            <ImageCard/>
        );
    }
}

const styles = StyleSheet.create({
});


const mapStateToProps = (state, ownProps) => {
    return{
    }
};

export default connect(
    mapStateToProps
)(Timeline);