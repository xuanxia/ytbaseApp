/**
 * Created by kangxiaojian on 2017/9/4.
 */
import React, { Component } from 'react';
import CommonTitleBar from '../components/CommonTitleBar';
import {Toast} from '../../../base/components';
import {utils} from '../../../base/utils';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio,
    WebView,
    Animated,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

const { width } = Dimensions.get('window');

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            confirmPwd: '',
            showProgress: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <CommonTitleBar nav={this.props.navigation} title={"注册"}/>
                <View style={styles.content}>
                    <Image source={require('../images/ic_launcher.png')} style={{width: 100, height: 100, marginTop: 100}} />
                    <View style={styles.pwdView}>
                        <View style={styles.pwdContainer}>
                            <Text style={{fontSize: 16}}>　用户名：</Text>
                            <TextInput onChangeText={(text)=>{this.setState({account: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.pwdDivider}></View>
                        <View style={styles.pwdContainer}>
                            <Text style={{fontSize: 16}}>　密 码：</Text>
                            <TextInput secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.pwdDivider}></View>
                        <View style={styles.pwdContainer}>
                            <Text style={{fontSize: 16}}>重复密码：</Text>
                            <TextInput secureTextEntry={true} onChangeText={(text)=>{this.setState({confirmPwd: text})}} style={styles.textInput} underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.pwdDivider}></View>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>this.register()}>
                            <View style={styles.loginBtn}>
                                <Text style={{color: '#FFFFFF', fontSize: 16}}>注册</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    isContainChinese(str) {
        var reg = /[\u4e00-\u9fa5]/g;
        if(reg.test(str)){
            return true;
        }
        return false;
    }
    async register() {
        const account = this.state.account;
        const password = this.state.password;
        const confirmPwd = this.state.confirmPwd;
        if (utils.isEmpty(account) || utils.isEmpty(password) || utils.isEmpty(confirmPwd)) {
            Toast.show('用户名或密码不能为空！');
            return ;
        }
        if (this.isContainChinese(account)) {
            Toast.show('用户名不能包含中文！');
            return ;
        }
        if (password !== confirmPwd) {
            Toast.show('两次输入的密码不一致！');
            return ;
        }
        const  res = await this.props.actions.doRegister({account,password});
        if(res && res.data &&res.data.id){
            //保存用户信息到本地
            AsyncStorage.setItem('USER-INFO',JSON.stringify(res.data));
            AsyncStorage.setItem('TOKEN',JSON.stringify(res.data.id));
            //this.props.navigation.navigate('Home');
            this.props.navigation.navigate('UserProfile');
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    pwdView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
    },
    textInput: {
        flex: 1
    },
    pwdContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    pwdDivider: {
        width: width - 60,
        marginLeft: 30,
        marginRight: 30,
        height: 1,
        backgroundColor: '#00BC0C'
    },
    loginBtn: {
        width: width - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        height: 50,
        borderRadius: 3,
        backgroundColor: '#00BC0C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});