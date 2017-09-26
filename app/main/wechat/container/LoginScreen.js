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
            password:''
        };
    }
    async doLogin(){
        //this.props.navigation.goBack();
        const  res = await this.props.actions.doLogin(this.state);
        if(res && res.data &&res.data.userId){
            AsyncStorage.setItem('TOKEN',res.data.token);
           this.props.navigation.navigate('Home');
        }
     }
    doGoRegister(){
        this.props.navigation.navigate('Register');
    }
    componentWillMount(){
        AsyncStorage.setItem('TOKEN','');
        this.props.actions.doChangeInLoginPageStatus({flag:true});
    }
    componentWillUnmount(){
        this.props.actions.doChangeInLoginPageStatus({flag:false});
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        用户名：
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
                <TouchableOpacity onPress={this.doGoRegister.bind(this)}>
                    <Text style={{marginTop:20,textAlign:'center'}}>-----------  立即注册  ----------</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.doLogin.bind(this)}>
                    <Text style={{marginTop:20,width:100,height:40,borderWidth:1,lineHeight:40,textAlign:'center'}}>立即登录</Text>
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

