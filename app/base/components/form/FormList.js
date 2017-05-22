/**
 * Created by kangxiaojian on 2017/5/22.
 */

import React,{Component} from 'react';
import {
    View ,
    Text,
    StyleSheet
} from 'react-native';

import {Input} from '../index';

/**
 * 父级参数:
 *  labelCls: 设置lable的样式配置项目
 *
 * 参数详解item的配置项
 * changeHandler {function} input框change的回调
 * fieldName 字段名
 * cls 一个样式label中的文本
 * labelText
 * placeholderText 底部显示的文案
 * rightTemp  任意view片段
 * secureTextEntry 是否显示密码形式
 *
 */

export default class FormList extends Component{

    onChange (item,e){
        item.changeHandler && item.changeHandler(item, e.nativeEvent.text);
    }
    itemTemplate(data){
        const template = data.map((item,index) => {
            return(
                <View style={[styles.rowCls, item.cls]} key={index}>
                    <Text style={ [styles.text, this.props.labelCls]}>{item.labelText}</Text>
                    <Input style={[styles.input, {flex: 1}]}  multiline={false}  maxLength={item.maxLength || 200} placeholderTextColor="#a8a8a8" onChange ={this.onChange.bind(this, item)} secureTextEntry={item.secureTextEntry}  placeholder={item.placeholderText} />
                    {item.rightTemp}
                </View>
            )
        });

        return template;
    }
    render (){
        return(
            <View>
                {this.itemTemplate(this.props.data)}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text:{
        color:'#444',
        fontSize:14
    },
    input:{
        fontSize: 14,
        height: 30,
        lineHeight: 20,
        flex: 1,
        marginBottom: 0,   //android bug
        padding: 0
    },
    rowClsFirst: {
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8'
    },
    rowCls: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        marginRight: 10,
        fontSize: 22
    },

    w90: {
        width: 65
    }
});

FormList.defaultProps = {
    labelCls: {
        width: 65
    }
};

