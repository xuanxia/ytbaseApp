/**
 * Created by kangxiaojian on 2017/4/26.
 */
import React, {Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry
} from 'react-native';
import connectComponent from './base/utils/connect'
import { StackNavigator,TabNavigator } from 'react-navigation';
import routes from './main/wechat/router';
/*======*/
import HomeScreen from './main/wechat/container/HomeScreen';
import ContactsScreen from './main/wechat/container/ContactsScreen.js';
import FindScreen from './main/wechat/container/FindScreen.js';
import MeScreen from './main/wechat/container/MeScreen.js';

/*======*/

const AppTabNavigator = TabNavigator({
    /*index: { screen: routes.MainIndex.screen },
    login: { screen: routes.NodeClubLogin.screen},*/
    Home: { screen: HomeScreen },
    Contacts: { screen: ContactsScreen },
    Find: { screen: FindScreen },
    Me: { screen: MeScreen }
},{
   // tabBarLabel:'Contacts',
    tabBarPosition:"bottom",
   // swipeEnabled:true,
   // animationEnabled:true,
   // initialRouteName:"index",
    tabBarOptions:{
        activeTintColor: '#45C018',
        inactiveTintColor: '#999999',
        showIcon: true,
        labelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        },
        style: {
            marginBottom: 0,
            backgroundColor: '#FCFCFC',
        },
        tabStyle: {
        }
    }
});
const IndexNavigator = StackNavigator(Object.assign({},
    {
        HomeIndex: { screen: AppTabNavigator },
    },routes),{
    headerMode: 'none', // 此参数设置不渲染顶部的导航条
});
class App extends Component {
    render() {
        return (
            <IndexNavigator></IndexNavigator>
        );
    }
}
export  default connectComponent(App);



