import React, { Component } from 'react';
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
  TextInput,
  TouchableOpacity,
} from 'react-native';

const BAR_STATE_SHOW_KEYBOARD = 1;
const BAR_STATE_SHOW_RECORDER = 2;

export default class ChatBottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barState: BAR_STATE_SHOW_KEYBOARD,
      showEmojiView: false,
      showMoreView: false,
      showSend:false,
    };
  }
  render() {
    const barState = this.state.barState;
    switch (barState) {
      case BAR_STATE_SHOW_KEYBOARD:
        return this.renderKeyBoardView();
        break;
      case BAR_STATE_SHOW_RECORDER:
        return this.renderRecorderView();
        break;
    }
  }
  renderKeyBoardView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress.bind(this, "soundBtn")}>
          <Image style={styles.icon} source={require('../images/ic_chat_sound.png')} />
        </TouchableOpacity>
        <TextInput style={styles.input}  onChangeText={
          (text)=>{
            if(text){
              this.setState({showSend:true});
            }
            this.props.onChangeTextHandle(text);
          }
        } />
        <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress.bind(this, "emojiBtn")}>
          <Image style={styles.icon} source={require('../images/ic_chat_emoji.png')} />
        </TouchableOpacity>
          {this.renderSendButton()}
      </View>
    );
  }
  renderRecorderView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress.bind(this, "soundBtn")}>
          <Image style={styles.icon} source={require('../images/ic_chat_keyboard.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={{flex: 1}}>
          <View style={styles.recorder}><Text>按住 说话</Text></View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress.bind(this, "emojiBtn")}>
          <Image style={styles.icon} source={require('../images/ic_chat_emoji.png')} />
        </TouchableOpacity>
          {this.renderSendButton()}
      </View>
    );
  }

  renderSendButton(){
      if(this.state.showSend){
        return (<TouchableOpacity onPress={()=>{this.props.sendMessageHandle()}}>
                <Text style={{}}>发送</Text>
        </TouchableOpacity>)
      }else{
        return(
              <TouchableOpacity activeOpacity={0.5} onPress={this.handlePress.bind(this, "moreBtn")}>
                <Image style={[styles.icon, {marginLeft: 10}]} source={require('../images/ic_chat_add.png')} />
              </TouchableOpacity>
            )
      }
  }


  handlePress = (tag) => {
    if ("soundBtn" == tag) {
      if (this.state.barState === BAR_STATE_SHOW_KEYBOARD) {
        this.setState({
          barState: BAR_STATE_SHOW_RECORDER,
          showEmojiView: false,
          showMoreView: false,
        });
      } else if (this.state.barState === BAR_STATE_SHOW_RECORDER) {
        this.setState({
          barState: BAR_STATE_SHOW_KEYBOARD,
          showEmojiView: false,
          showMoreView: false,
        });
      }
      this.props.updateView(false, false);
    } else if ("emojiBtn" == tag) {
      const showEmojiView = this.state.showEmojiView;
      this.props.updateView(!showEmojiView, false);
      this.setState({
        showEmojiView: !showEmojiView,
        showMoreView: false,
      })
    } else if ("moreBtn" == tag) {
      const showMoreView = this.state.showMoreView;
      this.props.updateView(false, !showMoreView);
      this.setState({
        showEmojiView: false,
        showMoreView: !showMoreView
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 5,
  },
  recorder: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#6E7377',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
