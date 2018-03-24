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
import network from "../../network";

class Timeline extends Component {
    constructor(props, context){
        super(props);
        this.state={
            data:[]
        };
    }
    componentDidMount(){
        //console.log(this.props.token);
    }
    componentWillUpdate(nextProps){
        // console.log(this.props.token);
        //console.log(nextProps.token);
        if(this.props.token !== nextProps.token && nextProps.token){
            //console.log("call timeline");
            network.social.getTimeline()
                .then(res=>res.json())
                .then(data=>{
                    //console.log(data)
                    this.setState({data});
                }).catch(err=>{
                console.log(err);
            });
        }
    }
    render() {
        let cards = null;
        // let cards = this.state.data.map((item)=>{
        //     let card;
        //     if(item.creatorId)
        //         card = <PostCard data={item}/>;
        //     else if(item.upvoteId)
        //         card = <LikeCard data={item}/>;
        //     else if(item.commenterId)
        //         card = <CommentCard data={item}/>;
        //     return (
        //         <ListItem key={item.id} style={styles.listItem}>
        //             {card}
        //         </ListItem>
        //     );
        // });
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
        timelines:state.timelines,
        token:state.token
    }
};

export default withRouter(connect(
    mapStateToProps
)(Timeline));