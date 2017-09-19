import React, { Component } from 'react';
import CommonTitleBar from '../components/CommonTitleBar.js';
import ChatBottomBar from '../components/ChatBottomBar.js';
import EmojiView from '../components/EmojiView.js';
import MoreView from '../components/MoreView.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  PixelRatio,
  StatusBar,
  FlatList,
  TouchableHighlight,
  AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import {mockData} from '../../../base/utils';
const global = mockData.global;
const { width } = Dimensions.get('window');
const MSG_LINE_MAX_COUNT = 15;

export default class ChattingScreen extends Component {
   constructor(props) {
    super(props);
    this.state = {
      showEmojiView: false,
      showMoreView: false,
    };
    this.contactUserId = this.props.navigation.state.params.contactUserId;
    //socketSend message
    this.message = {
        sendTo:this.contactUserId,
        type:1,  // 1单发 2群发
        data:{
            type:1, // 1 字符数据 2 图片 3小视屏
            news:'hello world'
        }
    }
  }
 async componentDidMount() {
      this.message.token =  await AsyncStorage.getItem('TOKEN');

      await this.props.actions.doGetLocMessageList(this.contactUserId);
  }
  async sendMessage(){
    // local show message
     const localMessage = {
         type:1,
         data:this.message.data,
         user:this.props.userProfileRcs
     };
      DeviceEventEmitter.emit('SEND_MESSAGE',this.message);
      await this.props.actions.doSendMessage(this.contactUserId,localMessage);
  }
    render() {
        const listData = this.props.chatMessageListRcs || [];
        const moreView = [];
        if (this.state.showEmojiView) {
            moreView.push(
                <View key={"emoji-view-key"}>
                  <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}} />
                  <View style={{height: global.emojiViewHeight}}>
                    <EmojiView />
                  </View>
                </View>
            );
        }
        if (this.state.showMoreView) {
            moreView.push(
                <View key={"more-view-key"}>
                  <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}} />
                  <View style={{height: global.emojiViewHeight}}>
                    <MoreView />
                  </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
              <CommonTitleBar title={"聊天"} nav={this.props.navigation} />
              <View style={styles.content}>
                <FlatList
                    ref={"flatList"}
                    data={listData}
                    renderItem={this.renderItem}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.bottomBar}>
                <ChatBottomBar updateView={this.updateView} sendMessageHandle={this.sendMessage.bind(this)} onChangeTextHandle={(text)=>{this.message.data.news = text}}/>
              </View>
                {moreView}
            </View>
        );
    }
  updateView = (emoji, more) => {
    this.setState({
      showEmojiView: emoji,
      showMoreView: more,
    })
  };
  // 当str长度超过某个限定值时，在str中插入换行符
  /* {
   id:'',
   type:'1' // 1： 自己发的 2：接收别人的
   data:{
   type:1, // 1 字符数据 2 图片 3小视屏
   news:'B 你好'
   },
   user：{
   // 当是接收消息时
   // 会返回用户信息
   }
   }*/
  renderItem = (item) => {
    let dataItem = item.item;
    let msg = '';
    const messageType =  dataItem.data.type;
    if(messageType ==1 ){
      //文字类型  其他类型后期支持 套不同的模板
       msg = this.spliceStr(dataItem.data.news);
    }
    if(dataItem.type == 1){
        // 发送出去的消息
        return (
            <View style={listItemStyle.containerSend} key={dataItem.id}>
              <View style={listItemStyle.msgContainerSend}>
                <Text style={listItemStyle.msgText}>{msg}</Text>
              </View>
              <Image style={listItemStyle.avatar} source={{uri:dataItem.user.avatar}} />
            </View>
        );

    }else{
      //接收的消息
        return (
            <View style={listItemStyle.container} key={dataItem.id}>
              <Image style={listItemStyle.avatar} source={{uri:dataItem.user.avatar}} />
              <View style={listItemStyle.msgContainer}>
                <Text style={listItemStyle.msgText}>{msg}</Text>
              </View>
            </View>
        );
    }

  }


  spliceStr(str) {
        var len = str.length;
        if (len > MSG_LINE_MAX_COUNT) {
            var pageSize = parseInt(len / MSG_LINE_MAX_COUNT);
            var result = '';
            var start, end;
            for (var i = 0; i < pageSize; i++) {
                start = i * MSG_LINE_MAX_COUNT;
                end = start + MSG_LINE_MAX_COUNT;
                if (end > len) {
                    end = len;
                }
                result += str.substring(start, end);
                result += '\n';
            }
            return result;
        } else {
            return str;
        }
    }
}

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: global.pageBackgroundColor
  },
  bottomBar: {
    height: 50,
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: global.dividerColor,
  }
});
