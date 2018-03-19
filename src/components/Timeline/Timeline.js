/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem } from 'native-base';
import {StyleSheet,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import PostCard from "./PostCard";
import LikeCard from "./LikeCard";
import RateCard from "./RateCard";
import CommentCard from "./CommentCard";
import Footer from "../Footer";
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class Timeline extends Component {
    constructor(props, context){
        super(props);
        this.state={

        };
    }

    render() {
        let cards = this.props.timelines.map((item)=>{
            let card;
            if(item.type === "post")
                card = <PostCard data={item}/>;
            else if(item.type === "like")
                card = <LikeCard data={item}/>;
            else if(item.type === "rate")
                card = <RateCard data={item}/>;
            else if(item.type === "comment")
                card = <CommentCard data={item}/>;
            return (
                <ListItem key={item.id} style={styles.listItem}>
                    {card}
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
                <Grid>
                    <Row>
                        <Col>
                            <ScrollView>
                                <List>
                                    {cards}
                                </List>
                            </ScrollView>
                        </Col>
                    </Row>
                </Grid>

                {/*<List dataArray={this.props.timelines}*/}
                      {/*renderRow={(item) =>*/}
                          {/*<ListItem style={styles.listItem}>*/}
                              {/*<ImageCard  data={item}/>*/}
                          {/*</ListItem>*/}
                      {/*}>*/}
                {/*</List>*/}
                <Footer/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        borderColor:"transparent",
        marginBottom:-20,
        marginTop: -17,
        marginLeft:-3,
        marginRight:-17,
    },
    listItemLast:{

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