/**
 * Created by kangxiaojian on 2017/5/22.
 */
import React,{Component} from 'react';
import {
    TextInput
} from 'react-native';


export default class Input extends Component {
    render() {
        return (
            <TextInput {...this.props} placeholderTextColor="#a8a8a8" />
        );
    }
}

Input.defaultProps = {
    placeholder: "",
    underlineColorAndroid: "transparent",
    returnKeyType: "next"
};