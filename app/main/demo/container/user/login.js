/**
 * Created by kangxiaojian on 2017/4/26.
 */
import React, { Component } from 'react';
import { AppRegistry, TextInput,StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import {FormList} from  '../../../../base/components';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.formListConfig = {
            data: [{
                labelText: '手机号:',
                placeholderText: '请输入手机号',
                changeHandler: ()=>{},
                fieldName: 'phone',
                maxLength: 11,
                rightTemp: (<Text>1111</Text>)
            }, {
                labelText: '验证码:',
                placeholderText: '请输入手机验证码',
                cls: styles.rowCls,
                maxLength: 4,
                changeHandler: ()=>{},
                fieldName: 'mobileVerifyCode'
            }
            ]
        };
    }
    goLogin(){
        const { navigate } = this.props.navigation;
        navigate('ContentPage', { user: 'Lucy' })
    }
    render() {
        return (
            <View>
                <FormList {...this.formListConfig} {...this.props} />
                <TouchableOpacity onPress={this.goLogin.bind(this)}>
                    <Text>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rowCls: {
        marginBottom: 10,
        borderBottomWidth: 0
    }
});