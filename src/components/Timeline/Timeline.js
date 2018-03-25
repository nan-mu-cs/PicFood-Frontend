/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Spinner } from 'native-base';
import {StyleSheet,ScrollView,RefreshControl} from 'react-native';
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
            data:[],
            refreshing:false,
            loading:true
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount(){
        //console.log(this.props.token);
    }
    componentWillUpdate(nextProps){
        // console.log(this.props.token);
        //console.log(nextProps.token);
        if(this.props.token !== nextProps.token && nextProps.token){
            //console.log("call timeline");
            this.setState({loading:true});
            this.getData();
        }
    }
    getData(){
        network.social.getTimeline()
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                this.setState({
                    data,
                    refreshing:false,
                    loading:false
                });
            }).catch(err=>{
            console.log(err);
        });
    }
    handleRefresh(){
        this.setState({refreshing:true});
        this.getData();
    }
    render() {
        let cards = this.state.data.map((item)=>{
            let card;
            if(item.creatorId)
                return (
                    <ListItem key={item.postId} style={styles.listItem}>
                        <PostCard data={item}/>
                    </ListItem>
                );
                // card = <PostCard data={item}/>;
            else if(item.upvoteId)
                return (
                    <ListItem key={item.upvoteId} style={styles.listItem}>
                        <LikeCard data={item}/>
                    </ListItem>
                );
                // card = <LikeCard data={item}/>;
            else if(item.commentId)
                return (
                    <ListItem key={item.commentId} style={styles.listItem}>
                        <CommentCard data={item}/>
                    </ListItem>
                );
                // card = <CommentCard data={item}/>;
            // return (
            //     <ListItem key={item.postId} style={styles.listItem}>
            //         {card}
            //     </ListItem>
            // );
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
                            {this.state.loading&&<Spinner/>}
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.handleRefresh}
                                    />
                                }
                            >
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