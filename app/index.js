/**
 * Created by kangxiaojian on 2017/4/26.
 */
import React, {Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    DeviceEventEmitter
} from 'react-native';
import connectComponent from './base/utils/connect'
import { StackNavigator,TabNavigator } from 'react-navigation';
import routes from './main/wechat/router';
const AppTabNavigator = TabNavigator({
    Home: { screen: routes.HomeScreen.screen },
    Contacts: { screen: routes.ContactsScreen.screen },
    Find: { screen: routes.FindScreen.screen },
    Me: { screen: routes.MeScreen.screen }
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
    constructor(props){
        super(props);
    }
    componentWillMount(){

    }
    render() {
        return (
            <IndexNavigator></IndexNavigator>
        );
    }
    componentWillUnmount(){
      //  this.event_1.remove();
    }
}
export  default connectComponent(App);



