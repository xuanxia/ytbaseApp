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
import routes from './main/demo/router';



const AppTabNavigator = TabNavigator({
    index: { screen: routes.MainIndex.screen },
    login: { screen: routes.NodeClubLogin.screen},
},{
    tabBarPosition:"bottom",
    swipeEnabled:true,
   // animationEnabled:true,
    initialRouteName:"index",
    tabBarOptions:{
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
        style: {
        },
    }
});
const IndexNavigator = StackNavigator(Object.assign({},{index:{
    screen:AppTabNavigator
}},routes));
class App extends Component {
    render() {
        return (
            <IndexNavigator></IndexNavigator>
        );
    }
}
export  default connectComponent(App);



