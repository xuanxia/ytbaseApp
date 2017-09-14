/**
 * Created by kangxiaojian on 2017/9/6.
 */
import React, { Component } from 'react';
import CommonTitleBar from '../components/CommonTitleBar';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio,
    ScrollView,
    WebView,
    Animated,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    Button
} from 'react-native';

var { width, height} = Dimensions.get('window');

export default class NewFriendsScreen extends Component {
    constructor(props){
        super(props);

    }
    render() {
        let listData = this.props.userListRcs.rows || [];
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <CommonTitleBar nav={this.props.navigation} title={"新的朋友"}/>
                <View style={styles.searchView}>
                    <View style={styles.searchEditText}>
                        <Image style={styles.searchImg} source={require('../images/ic_search_gray.png')} />
                        <TextInput style={styles.searchInput}  onChangeText={this.doSearch.bind(this)} underlineColorAndroid="transparent" placeholder="微信号/QQ号/手机号" />
                    </View>
                    <View style={styles.searchLine}></View>
                </View>
                <Text style={styles.newFriendTag}>
                    新的朋友
                </Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={listData}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
    renderItem = (data) => {
        let dataItem = data.item;
        return (
            <View key={"list-item-" + dataItem.id} style={listItem.container}>
                <Image style={listItem.avatar} source={require('../images/avatar.png')} />
                <View style={listItem.titleContainer}>
                    <Text style={listItem.title}>{dataItem.nickName}</Text>
                    <Text style={listItem.subtitle}>{}</Text>
                </View>
                <View style={listItem.btnContainer}>
                    <Button title="加为好友" color="#19AD17" onPress={this.addFriend.bind(this,dataItem)} />
                </View>
            </View>
        );
    };
    doSearch(keyWords){
        if(keyWords){
            this.props.actions.doQueryUserList({pageSize:10,pageNum:1,keyWords});
        }else{
            this.props.actions.doCleanUserList();
        }
    }
    async addFriend(dataItem){
       const result = await this.props.actions.doAddFriend({acceptUser:dataItem.userId});
       if(result){
           alert('请求发送成功！');
       }
    }
}

const listItem = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 1 / PixelRatio.get()
    },
    avatar: {
        width: 45,
        height: 45,
        marginLeft: 10,
        marginRight: 10,
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16
    },
    subtitle: {
        fontSize: 13
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

const styles = StyleSheet.create({
    searchView: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop:10
    },
    searchEditText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchImg: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        height:30

    },
    searchLine: {
        height: 1,
        backgroundColor: '#ECECEC'
    },
    newFriendTag: {
        fontSize: 13,
        color: '#8A8A8A',
        marginLeft: 10,
        height:30,
        lineHeight:30
    },
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});