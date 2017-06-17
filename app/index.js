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


const IndexNavigator = StackNavigator(routes,{
    initialRouteName:'MainIndex',
});
const LoginNavigator = StackNavigator(routes,{
    initialRouteName:'NodeClubLogin',
    navigationOptions:{
        header:null
    }
});

class IndexScreen extends React.Component {
    render() {
        return <IndexNavigator/>
    }
}

class LoginScreen extends React.Component {
    render() {
        return <LoginNavigator/>
    }
}

const AppTabNavigator = TabNavigator({
    index: { screen: IndexScreen },
    login: { screen: LoginScreen },
},{
    tabBarPosition:"bottom",
    swipeEnabled:true,
    animationEnabled:true,
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
class App extends Component {
    render() {
        return (
            <AppTabNavigator></AppTabNavigator>
        );
    }
}
export  default connectComponent(App);



