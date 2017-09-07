import React, { Component } from 'react';
import {
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {mockData} from '../../../base/utils';
const global = mockData.global;
const { width} = Dimensions.get('window');

export default class ListItemDivider extends Component {
  render() {
    var height = 1 / PixelRatio.get();
    return (
      <View style={{width: width, height: height, backgroundColor: '#FFFFFF'}}>
        <View style={{width: width - 20, height: height, marginLeft: 10, marginRight: 10, backgroundColor: global.dividerColor}}/>
      </View>
    );
  }
}
