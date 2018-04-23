/**
 * Created by kai on 05/03/2018.
 */
import React, {Component} from 'react';
import {Body, Container, Header, List, ListItem, Spinner, Title} from 'native-base';
import {RefreshControl, ScrollView, StatusBar, StyleSheet,ListView} from 'react-native';
import {connect} from 'react-redux';
import PostCard from "./PostCard";
import LikeCard from "./LikeCard";
import CommentCard from "./CommentCard";
import {Col, Grid, Row} from "react-native-easy-grid";
import network from "../../network";
// import {PullView} from 'react-native-pull';

class Timeline extends Component {
  constructor(props, context) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: this.ds.cloneWithRows([]),
      refreshing: false,
      loading: false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getData = this.getData.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    if (this.props.timelines.length === 0) {
      this.setState({loading: true});
      this.getData();
    }
  }

  componentWillUpdate(nextProps) {
    // console.log(this.props.token);
    //console.log(nextProps.token);
    if (this.props.token !== nextProps.token && nextProps.token) {
      //console.log("call timeline");
      // this.setState({loading: true});
      // this.getData();
    }
  }

  getData() {
    network.social.getTimeline()
      .then(res => {
        if(res.ok) return res.json();
        throw res;
      })
      .then(data => {
        this.setState({
          data:this.ds.cloneWithRows(data),
          refreshing: false,
          loading: false
        });
        this.props.dispatch({type: "UPDATE_TIMELINE", data: data});
      }).catch(err => {
      console.log('ERROR', err);
    });
  }

  handleRefresh() {
    this.setState({refreshing: true});
    this.getData();
  }
  renderItem(item){
    if (item.creatorId)
      return (
        <ListItem key={item.postId} style={styles.listItem}>
          <PostCard data={item}/>
        </ListItem>
      );
    // card = <PostCard data={item}/>;
    else if (item.upvoteId)
      return (
        <ListItem key={item.upvoteId} style={styles.listItem}>
          <LikeCard data={item}/>
        </ListItem>
      );
    // card = <LikeCard data={item}/>;
    else if (item.commentId)
      return (
        <ListItem key={item.commentId} style={styles.listItem}>
          <CommentCard data={item}/>
        </ListItem>
      );
  }
  render() {
    // let cards = this.props.timelines.map((item) => {
    //   let card;
    //   if (item.creatorId)
    //     return (
    //       <ListItem key={item.postId} style={styles.listItem}>
    //         <PostCard data={item}/>
    //       </ListItem>
    //     );
    //   // card = <PostCard data={item}/>;
    //   else if (item.upvoteId)
    //     return (
    //       <ListItem key={item.upvoteId} style={styles.listItem}>
    //         <LikeCard data={item}/>
    //       </ListItem>
    //     );
    //   // card = <LikeCard data={item}/>;
    //   else if (item.commentId)
    //     return (
    //       <ListItem key={item.commentId} style={styles.listItem}>
    //         <CommentCard data={item}/>
    //       </ListItem>
    //     );
    // });
    return (
      <Container>
        <Header style={{backgroundColor: '#D8485D'}}>
          <StatusBar barStyle="light-content"/>
          <Body>
          <Title style={{color: 'white'}}>PicFood</Title>
          </Body>
        </Header>
        <Grid>
          <Row>
            <Col>
              {this.state.loading && <Spinner color='black'/>}
              <ListView
                dataSource={this.state.data}
                renderRow={(item)=>this.renderItem(item)}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                  />
                }
                onEndReached={()=>console.log("reach end!!!")}
              >
                {/*{cards}*/}
                {/*<List style={styles.listStyle}>*/}
                  {/**/}
                {/*</List>*/}
              </ListView>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const
  styles = StyleSheet.create({
    listItem: {
      borderColor: "transparent",
      marginBottom: -10,
      marginTop: -17,
      marginLeft: -3,
      marginRight: -17,
    },
    listItemLast: {},
    listStyle: {
      paddingTop: 10,
      paddingHorizontal: 8
    }
  });


const
  mapStateToProps = (state, ownProps) => {
    return {
      timelines: state.timelines,
      token: state.token,
      user: state.user
    }
  };

export default connect(
  mapStateToProps
)(Timeline);