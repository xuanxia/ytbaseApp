import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  StatusBar,
  PixelRatio,
  TextInput,
    Platform
} from 'react-native';
import {mockData,utils} from '../../../base/utils';
const { width } = Dimensions.get('window');
const global = mockData.global;

export default class CommonTitleBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
              <StatusBar
                  backgroundColor='#000'
                  barStyle="light-content"
              />
              <View style={styles.content}>
                <TouchableOpacity activeOpacity={0.5} onPress={this.handleBackClick}>
                  <Image source={require('../images/ic_back.png')} style={styles.backBtn} />
                </TouchableOpacity>
                <View style={styles.btnDivider} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{this.props.title}</Text>
                    {
                        utils.isEmpty(this.props.rightIcon) ? (null) : (
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleRightClick()}>
                                  <Image style={styles.img} source={this.props.rightIcon} />
                                </TouchableOpacity>
                            )
                    }
                    {
                        utils.isEmpty(this.props.rightBtnText) ? (null) : (
                                <Button
                                    onPress={()=>this.props.handleRightBtnClick()}
                                    title={this.props.rightBtnText}
                                    color="#19AD17"
                                />
                            )
                    }
                </View>
              </View>
            </View>
        );
    }
    handleRightClick() {
        if (!utils.isEmpty(this.props.handleRightClick)) {
            this.props.handleRightClick();
        }
    }
    handleBackClick = () => {
        this.props.nav.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop:20
    },
    content: {
        width: width,
        height: 50,
        backgroundColor: global.titleBackgroundColor,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        marginLeft: 8,
        marginRight: 8,
        width: 30,
        height: 30,
    },
    btnDivider: {
        width: 1 / PixelRatio.get(),
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#888888'
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
    },
    img: {
        width: 30,
        height: 30,
        marginRight: 5
    }
});
