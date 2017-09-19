/**
 * Created by kangxiaojian on 2017/9/18.
 */
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
            nickName:'',
            avatar:'https://staticonline.hipac.cn/item/201606/06301713172785.jpeg@200w',
            sex:1,
            phone:'',
        };
    }
    async doSubmit(){
        const  res = await this.props.actions.doAddUserProfile(this.state);
        if(res && res.data &&res.data.id){
            this.props.navigation.navigate('Home');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        昵称：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.5)}}
                        onChangeText={(text) => this.setState({
                            nickName:text
                        })}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text>
                        手机：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.55)}}
                        onChangeText={(text) => this.setState({
                            phone:text
                        })}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text>
                        头像：
                    </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,width:width/(1.55)}}
                        onChangeText={(text) => this.setState({
                            password:text
                        })}
                    />
                </View>
                <TouchableOpacity onPress={this.doSubmit.bind(this)}>
                    <Text style={{marginTop:20,width:100,height:40,borderWidth:1,lineHeight:40,textAlign:'center'}}>立即提交</Text>
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

