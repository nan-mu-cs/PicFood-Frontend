import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, FooterTab, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header/>
        <Grid>
          <Row size={9}>
            <Col>
              <ImageCard/>
            </Col>
          </Row>
          <Row size={1}>
            <Col>
              <Footer/>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
