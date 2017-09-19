/**
 * Created by kangxiaojian on 2017/8/17.
 */
import React, { Component } from 'react';
import TitleBar from '../components/TitleBar.js';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    PixelRatio,
    StatusBar,
    FlatList,
    TouchableHighlight,
    AsyncStorage,
    Platform,
    DeviceEventEmitter
} from 'react-native';

const { width } = Dimensions.get('window');
import {mockData} from '../../../base/utils';
const global = mockData.global;
let listData = [];
for (let i = 0; i < 20; i++) {
    listData.push({
        key: i,
        title: "item " + i,
        subtitle: "subtitle item " + i,
        time: "昨天"
    })
}

export default class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '微信',
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../images/ic_weixin_selected.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../images/ic_weixin_normal.png')}/>
            );
        },
    };
   async componentWillMount(){
        //this.props.navigation.navigate('Login');
        DeviceEventEmitter.addListener('goLoginPage', ()=>{
           this.props.navigation.navigate('Login');
       });
       //
       // this.props.navigation.navigate('NewFriends');
       //
       //  let userInfoStr = await AsyncStorage.getItem('USER-INFO');
       //  if(!userInfoStr){
       //      this.props.navigation.navigate('Login');
       //  }
    }

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS !=='ios' && <StatusBar
                    backgroundColor='#000'
                    barStyle="light-content"
                />}
                <TitleBar nav={this.props.navigation}/>
                <View style={styles.divider}></View>
                <View style={styles.content}>
                    <FlatList
                        data={listData}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={styles.divider}></View>
            </View>
        );
    }
    renderItem = (data) => {
        return (
            <View key={data.index}>
                <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{this.props.navigation.navigate('Chatting')}}>
                    <View style={styles.listItemContainer}>
                        <Image source={require('../images/ic_list_icon.png')} style={{width: 50, height: 50}} />
                        <View style={styles.listItemTextContainer}>
                            <View style={styles.listItemSubContainer}>
                                <Text style={styles.listItemTitle}>{data.item.title}</Text>
                                <Text style={styles.listItemTime}>{data.item.time}</Text>
                            </View>
                            <Text style={styles.listItemSubtitle}>{data.item.subtitle}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.divider} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: width,
        height: 1 / PixelRatio.get(),
        backgroundColor: global.dividerColor
    },
    content: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    listItemContainer: {
        flexDirection: 'row',
        width: width,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    listItemTextContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 15,
    },
    listItemSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTitle: {
        color: '#333333',
        fontSize: 16,
        flex: 1,
    },
    listItemTime: {
        color: '#999999',
        fontSize: 12,
    },
    listItemSubtitle: {
        color: '#999999',
        fontSize: 14,
        marginTop: 3,
    },
    tabBarIcon: {
        width: 24,
        height: 24,
    },
});

