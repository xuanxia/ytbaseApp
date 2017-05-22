/**
 * Created by kangxiaojian on 2017/5/22.
 */
import React,{Component} from 'react';
import {
    ToastAndroid,
    Platform
} from 'react-native';
import ToastIos from 'react-native-root-toast';

const toast = {
    show: (message: string) => {
        Platform.OS === 'ios' ? ToastIos.show(message) : ToastAndroid.show(message,ToastAndroid.SHORT);
    }
}

export default toast;