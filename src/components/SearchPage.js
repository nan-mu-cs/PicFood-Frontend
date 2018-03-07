/**
 * Created by kai on 05/03/2018.
 */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon } from 'native-base';
import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import ImageCard from "./ImageCard";
import SearchBar from "./SearchBar";
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./Footer"
class SearchPage extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        // return (
        //     <Grid>
        //         <Row>
        //             <Col>
        //                 <Text>this is search page</Text>
        //             </Col>
        //         </Row>
        //     </Grid>
        // );
        return (
            <Container>
                <SearchBar/>
                <Footer/>
            </Container>
        )
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
)(SearchPage);