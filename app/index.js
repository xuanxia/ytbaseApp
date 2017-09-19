/**
 * Created by kangxiaojian on 2017/4/26.
 */
import React, {Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';
import {LoadingView} from './run/components';
import connectComponent from './base/utils/connect'
import { StackNavigator,TabNavigator } from 'react-navigation';
import {httpDomain,HTTP_SERVICE_KEY} from './run/config'
import io from 'socket.io-client';
const  socket = io(httpDomain[HTTP_SERVICE_KEY].socketServe);
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
   async componentWillMount(){
        const token = await AsyncStorage.getItem('TOKEN');
        if(socket && token){
            socket.on('connect', () => {
                socket.emit('login', JSON.stringify({token}));
            });
            //系统消息
            socket.on('res', msg => {
                console.log('res from server res: %s!', msg);
            });
            //单聊
            socket.on('chat', msg => {
                console.log('res from server chat: %s!', msg);
               try{
                   const data = JSON.parse(msg);
                   this.props.actions.doSendMessage(data.user.userId,data);
               }catch (e){
                  console.log(e);
               }
            });
            DeviceEventEmitter.addListener('SEND_MESSAGE', (message)=>{
                console.log('req %s!',JSON.stringify(message));
                socket.emit('chat',JSON.stringify(message));
            });
        }
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {this.showLoading()}
                <IndexNavigator></IndexNavigator>
            </View>
        );
    }
    componentWillUnmount(){
      //  this.event_1.remove();
    }
    showLoading(){
        const loadingRcs = this.props.loadingRcs;
        if(loadingRcs && loadingRcs.isLoading){
           return  (<LoadingView loadingText={loadingRcs.loadingText}/>);
        }else{
            return (<View></View>)
        }
    }
}
export  default connectComponent(App);



