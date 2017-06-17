/**
 * Created by kangxiaojian on 2017/5/17.
 */
import React, { Component } from 'react';
import { AppRegistry, View ,Text } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
            <View>
                <Text>Chat with Lucy</Text>
            </View>
        );
    }
}