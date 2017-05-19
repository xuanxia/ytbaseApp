/**
 * Created by kangxiaojian on 2017/5/19.
 */
import React,{Component,PropTypes} from 'react';
import {
    View ,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import {FontIcon} from '../index';

export default class PageList extends Component{

    static propTypes ={
        data:PropTypes.array
    };
    static defaultProps = {
        data:[
           /* {
                text: '资质信息',  // 标题
                onPress: ()=>{},  // 点击事件
                leftTemp:         //左侧显示内容
                rightTemp:(<Text></Text>), //右侧显示内容
                cls:styles.siginRow // 单行样式
                isHideRightIcon：  // 隐藏右侧箭头Icon
            }*/
        ]
    };

    renderIcon(item){
        return item.prevIcon ? <FontIcon name={item.prevIcon} size={18} color="#a8a8a8" style={[styles.icon]}/> : null;
    }

    itemTemplate(data){
        const template = data.map((item,index) => {
            const onPressCb = item.onPress?item.onPress: ()=>{};
            return(
                <TouchableHighlight style={[styles.rowCls,item.cls]} onPress={onPressCb.bind(this,item)} key={index} underlayColor='rgba(34,26,38,0)'>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        {item.leftTemp}
                        {this.renderIcon(item)}
                        <Text style={[{fontSize:14},{flex: 1, color:'#444'}]}>{item.text}</Text>
                        {item.rightTemp}
                        {!item.isHideRightIcon &&  <FontIcon
                            name={'icon-right'} size={18} color="#a8a8a8" />}
                    </View>
                </TouchableHighlight>
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
    rowClsFirst: {
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8'
    },
    rowCls: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        backgroundColor:'#fff'
    },
    icon:{
        marginRight: 10,
        fontSize: 22
    }
});

