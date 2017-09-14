import React, { Component } from 'react';
import MenuPopWindow from './PopupWindow.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');
import {mockData} from '../../../base/utils';
const global = mockData.global;

export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList:[
          {
            text:'发起群聊',
            icon:require('../images/ic_pop_group_chat.png'),
            handleClick:()=>{}
          },
          {
              text:'添加朋友',
              icon:require('../images/ic_pop_add_friends.png'),
              handleClick:function () {
                  props.nav.navigate('NewFriends');
              }
          },
          {
              text:'扫一扫',
              icon:require('../images/ic_pop_scan.png'),
              handleClick:()=>{}
          },
          {
              text:'收付款',
              icon:require('../images/ic_pop_pay.png'),
              handleClick:()=>{}
          },
          {
              text:'帮助与反馈',
              icon:require('../images/ic_pop_help.png'),
              handleClick:()=>{}
          }
          ],
      showPop: false,
    }
  }
  render() {
    return (
      <View style={styles.titleBarContainer}>
        <View style={styles.titleBarTextContainer}>
          <Text style={styles.title}>微信</Text>
        </View>
        <View style={styles.titleBarButtonContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.handleSearchClick.bind(this)}>
            <Image
              source={require('../images/ic_search.png')}
              style={styles.titleBarImg}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={this.handleAddClick.bind(this)}>
            <Image
              source={require('../images/ic_add.png')}
              style={styles.titleBarImg}
            />
          </TouchableOpacity>
          <View style={{ position: 'absolute', top: 70, left: 0, width: width, height: height }}>
            <MenuPopWindow
              width={140}
              height={200}
              show={this.state.showPop}
              closeModal={(show) => { this.setState({ showPop: show }) }}
              menuData={this.state.menuList }
              />
          </View>
        </View>
      </View>
    );
  }

    componentWillUnmount(){
        this.setState({showPop:false});
    }

  handleSearchClick  () {
    // 跳转到SearchScreen界面
    this.props.nav.navigate('Search');
  };

  handleAddClick  ()  {
    this.setState({showPop: !this.state.showPop});
  }

}

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}>
        <View style={modalStyle.container}>
          <View style={modalStyle.content}>
            <Text>Hello World! This is a Modal!</Text>
            <Button
              style={{marginTop: 20}}
              title={"Close"}
              onPress={() => {this.setState({modalVisible: false})}} />
          </View>
        </View>
      </Modal>
    );
  }
  closeModel = () => {
    this.setState({modalVisible: false});
  }
  openModal() {
    this.setState({modalVisible: true});
  }
}

const modalStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: width - 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    height: 100,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

const styles = StyleSheet.create({
  titleBarContainer: {
     flexDirection: 'row',
     width: width,
     height: 50,
     backgroundColor: global.titleBackgroundColor,
     marginTop:  (Platform.OS ==='ios'?20:0),
     zIndex:99
  },
  titleBarTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleBarButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBarImg: {
    width: 25,
    height: 25,
    marginLeft: 15,
    marginRight: 15,
  }
});
