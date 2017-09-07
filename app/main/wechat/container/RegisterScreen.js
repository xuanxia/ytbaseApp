/**
 * Created by kangxiaojian on 2017/9/4.
 */
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';

const { width} = Dimensions.get('window');
export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            account:'',
            password:'',
            nickName:''
        };
    }
    async doRegister(){
        // TODO 检验
        const  res = await this.props.actions.doRegister(this.state);
        if(res && res.data &&res.data.id){
            //保存用户信息到本地
            AsyncStorage.setItem('USER-INFO',JSON.stringify(res.data));
            AsyncStorage.setItem('TOKEN',JSON.stringify(res.data.id));
            this.props.navigation.navigate('Home');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        登录账户：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.5)}}
                        onChangeText={(text) => this.setState({
                            account:text
                        })}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text>
                        密码：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.55)}}
                        onChangeText={(text) => this.setState({
                            password:text
                        })}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text>
                        昵称：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.55)}}
                        onChangeText={(text) => this.setState({
                            nickName:text
                        })}
                    />
                </View>
                <TouchableOpacity onPress={this.doRegister.bind(this)}>
                    <Text style={{marginTop:20,width:100,height:40,borderWidth:1,lineHeight:40,textAlign:'center'}}>立即注册</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

