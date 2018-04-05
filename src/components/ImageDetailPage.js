/**
 * Created by kai on 06/03/2018.
 */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Body,
  Title,
  List,
  ListItem,
  Left,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Item,
  Input
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import Comments from "./Comments";
import {withRouter} from 'react-router-native';
import {Col, Row, Grid} from "react-native-easy-grid";

class ImageDetailPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickBack() {
    this.props.history.goBack();
  }

  render() {
    const {avatar, user, location, image, comments} = this.props.location.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleClickBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Photo</Title>
          </Body>
          <Right/>
        </Header>
        <Grid>
          <Row size={9}>
            <Col>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{cache: 'force-cache', uri: avatar}}/>
                    <Body>
                    <Text>{user}</Text>
                    <Text note>{location}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{cache: 'force-cache', uri: image}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                {/*<CardItem>*/}
                {/*<Left>*/}
                {/*<Button transparent>*/}
                {/*<Icon active name="chatbubbles" />*/}
                {/*/!*<Text>{this.props.data.comments.length}</Text>*!/*/}
                {/*</Button>*/}
                {/*</Left>*/}
                {/*</CardItem>*/}
                <CardItem>
                  <Left>
                    <Comments comments={comments}/>
                  </Left>
                </CardItem>
              </Card>
            </Col>
          </Row>
          <Row size={1}>
            <Col searchBar rounded>
              <Item>
                <Icon name="ios-search"/>
                <Input placeholder="Search"/>
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputItem: {
    position: "absolute",
    bottom: 0
  },
  comments: {
    height: "100%"
  }
});


const mapStateToProps = (state, ownProps) => {
  return {}
};

export default withRouter(connect(
  mapStateToProps
)(ImageDetailPage));