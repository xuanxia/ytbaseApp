import React, { Component } from 'react';
import CommonTitleBar from '../components/CommonTitleBar.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {mockData} from '../../../base/utils';
const global = mockData.global;
export default class ScanResultScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBar title={"扫码结果"} nav={this.props.navigation} />
        <View style={styles.content}>
          <Text style={styles.resultText}>{this.props.navigation.state.params.resultText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  resultText: {
    fontSize: 16,
    color: global.titleBackgroundColor,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  }
});
