import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Modal
} from 'react-native';

export default class LoadingView extends Component {
  render() {
    const loadingText = this.props.loadingText == null ? "加载中..." : this.props.loadingText;
    return (
      <Modal
        transparent = {true}
        onRequestClose={()=>this.props.cancel()}
        >
        <View style={styles.loading}>
            <ActivityIndicator size='large' color='#FFFFFF' />
            <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF'
  }
});
