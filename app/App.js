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
import {Provider} from 'react-redux';
import HipacApp from './index';
import configureStore from './run/configureStore';
const store = configureStore();
class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <HipacApp />
            </Provider>
            )
    }
}
AppRegistry.registerComponent('ytbaseApp',() => App);