/**
 * Created by kai on 05/03/2018.
 */
import React, { Component } from 'react';
import { Container, Header, Content, FooterTab, Button, Text, Icon,Body,Title,List, ListItem,Fab } from 'native-base';
import {StyleSheet,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import PostCard from "./PostCard";
import LikeCard from "./LikeCard";
import RateCard from "./RateCard";
import CommentCard from "./CommentCard";
import Footer from "../Footer";
import { withRouter } from 'react-router-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ImagePicker } from 'expo';
class Timeline extends Component {
    constructor(props, context){
        super(props);
        this.state={
            active:false
        };
        this.handlePostImage = this.handlePostImage.bind(this);
    }
    handlePostImage(){
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }).then((result)=>{
            // console.log(result);
            if (!result.cancelled) {
                this.props.history.push({
                    pathname: "/post",
                    state:{
                        image:result.uri
                    }
                });
            }
        });
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
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="add" />
                        <Button style={{ backgroundColor: '#34A34F' }} onPress={this.handlePostImage}>
                            <Icon name="ios-images" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                            <Icon name="md-text" />
                        </Button>
                    </Fab>
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