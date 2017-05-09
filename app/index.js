/**
 * Created by kangxiaojian on 2017/4/26.
 */
import React,{Component} from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Platform,
    DeviceEventEmitter,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    Linking,
    NativeModules,
    InteractionManager,
    Text,
    FlatList
} from 'react-native';
import {connectComponent,connectStore ,navigationBarCt} from './base/utils';

class HipacApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[]
        }
    }
    goDetail(item){

    }
   async  componentWillMount(){
     const list = await  this.props.actions.doTopicsList({
            page:1,
            limit:10
        });
        this.setState({
            list:list.data
        })
    }
    render(){

        return (
            <View>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => <Text style={{height:30}} onPress={this.goDetail.bind(this,item)}>{item.title}</Text>}
                />
            </View>
        );
    }
}
export  default connectComponent(HipacApp)
