/**
 * Created by kai on 06/03/2018.
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Content, List, ListItem, Text} from 'native-base';

export default class Comments extends Component {
  render() {
    let comments = this.props.comments.map((item) => {
      return (
        <ListItem key={item.id} style={styles.listItem}>
          <Text>{item.user}</Text>
          <Text>{item.comment}</Text>
        </ListItem>
      )
    });
    return (
      <Content>
        <List>
          {comments}
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: "transparent"
  }
});