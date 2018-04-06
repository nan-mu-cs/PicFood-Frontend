/**
 * Created by kai on 05/03/2018.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Text, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class OurFooter extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  handleChangeTab(tab, url) {
    this.props.dispatch({type: "CHANGE_TAB", data: tab});
    this.props.history.push(url);
  }

  render() {
    let tabs = this.props.tabs.map((item) => {
      return (
        <Button key={item.id} active={this.props.currentTab == item.id}
                onPress={this.handleChangeTab.bind(this, item.id, item.url)}
                style={styles.button}
        >
          <Icon name={item.icon}/>
          <Text style={styles.text}>{item.name}</Text>
        </Button>
      );
    });
    return (
      <Footer>
        <FooterTab style={styles.footerTab}>
          {tabs}
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footerTab: {
    backgroundColor: "white"
  },
  button: {
    borderRadius: 0
  },
  text: {
    fontSize: 12
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    tabs: state.tabs,
    currentTab: state.currentTab
  }
};

export default connect(
  mapStateToProps
)(OurFooter);