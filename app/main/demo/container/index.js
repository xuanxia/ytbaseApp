/**
 * Created by kangxiaojian on 2017/4/26.
 */

import React,{Component} from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Platform,
    DeviceEventEmitter,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    Linking,
    NativeModules,
    InteractionManager,
    Text,
    FlatList
} from 'react-native';
import {PageList} from '../../../base/components';
export  default class DemoApp extends Component {
    static navigationOptions = {
        title:"首页",
        //headerTitle headerBackTitle headerTruncatedBackTitle headerRight
        // https://reactnavigation.org/docs/navigators/stack
        //header:null
    };
    constructor(props){
        super(props);
        this.pageListConfig = {
            data: [
                {text: '输入框',onPress:()=>{props.navigation.navigate('NodeClubLogin')},rightTemp:(<Text style={{color:'#666'}}>login</Text>)},
                {text: '轮播图', onPress: ()=>{props.navigation.navigate('MySwiper')}},
                {text: 'test3', onPress: ()=>{},}
            ]
        };
    }
    componentWillMount() {
    }
    render(){

        return (
            <View style={styles.container}>
                <PageList {...this.pageListConfig}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});
