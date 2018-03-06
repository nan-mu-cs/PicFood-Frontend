/**
 * Created by kai on 05/03/2018.
 */
import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import {connect} from 'react-redux';
import SearchBar from "./SearchBar";

class OurHeader extends Component {
    render() {
        if(this.props.currentTab == "search")
            return (
                <SearchBar/>
            );
        return (
            <Header>
                <Body>
                    <Title>PicFood</Title>
                </Body>
            </Header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentTab: state.currentTab
    }
};

export default connect(
    mapStateToProps
)(OurHeader);