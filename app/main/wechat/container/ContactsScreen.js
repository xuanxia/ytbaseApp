import React, { Component } from 'react';
import TitleBar from '../components/TitleBar.js';
import SideBar from '../components/SideBar.js';
import CommonLoadingView from '../components/CommonLoadingView.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  FlatList,
  TouchableHighlight,
} from 'react-native';

const { width } = Dimensions.get('window');
import {mockData,pinyinUtil} from '../../../base/utils';
const global = mockData.global;

export default class ContactsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '联系人',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('../images/ic_contacts_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('../images/ic_contacts_normal.png')}/>
      );
    },
  };

  constructor(props) {
    super(props);
  }
   componentWillMount(){
      this.props.actions.doQueryContact();
  }
  render() {
      const contacts = this.props.contactListRcs.rows || [];
      let listData = [];
      let headerListData = [];
      const headerImages = [require('../images/ic_new_friends.png'), require('../images/ic_group_chat.png'),
          require('../images/ic_tag.png'), require('../images/ic_common.png')];
      const headerTitles = ['新的朋友', '群聊', '标签', '公众号'];
      let index = 0;
      headerTitles.map((item,i)=>{
          headerListData.push({
              key: index++,
              title: headerTitles[i],
              icon: headerImages[i],
              sectionStart: false,
          });
      });
      contacts.map((item,i)=>{
          let pinyin = pinyinUtil.getFullChars(item.nickName);
          let firstLetter = pinyin.substring(0, 1);
          if (firstLetter < 'A' || firstLetter > 'Z') {
              firstLetter = '#';
          }
          listData.push({
              key: index++,
              icon: {uri: item.avatar},
              title: item.nickName,
              pinyin: pinyin,
              firstLetter: firstLetter,
              sectionStart: false,
              userId:item.userId
          })
      });
      // 按拼音排序
      listData.sort(function(a, b) {
          if (a.pinyin === undefined || b.pinyin === undefined) {
              return 1;
          }
          if(a.pinyin > b.pinyin) {
              return 1;
          }
          if (a.pinyin < b.pinyin) {
              return -1;
          }
          return 0;
      });
      listData = headerListData.concat(listData);
      // 根据首字母分区
      for (let i = 0; i < listData.length; i++) {
          let obj = listData[i];
          if (obj.pinyin === undefined) {
              continue;
          }
          if (i > 0 && i < listData.length) {
              let preObj = listData[i - 1];
              if (preObj.pinyin === undefined && obj.pinyin !== undefined) {
                  obj.sectionStart = true;
              } else if (preObj.pinyin !== undefined && obj.pinyin !== undefined && preObj.firstLetter !== obj.firstLetter) {
                  obj.sectionStart = true;
              }
          }
      }
      return (
          <View style={styles.container}>
            <TitleBar nav={this.props.navigation}/>
            <View style={styles.divider}></View>
            <View style={styles.content}>
              <FlatList
                  data={listData}
                  renderItem={this.renderItem}
              />
              <SideBar />
            </View>
            <View style={styles.divider}></View>
          </View>
      );
  }

  renderItem = (item) => {
    var section = [];
    if (item.item.sectionStart) {
      section.push(<Text key={"section" + item.item.key} style={listItemStyle.sectionView}>{item.item.firstLetter}</Text>);
    }
    return (
      <View>
        {section}
        <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={()=>{this.props.navigation.navigate('ContactDetail', {title: '详细资料', data: item.item})}}>
          <View style={listItemStyle.container} key={item.item.key}>
              <Image style={listItemStyle.image} source={item.item.icon == null ? require('../images/avatar.png') : item.item.icon} />
              <Text style={listItemStyle.itemText}>{item.item.title}</Text>
          </View>
        </TouchableHighlight>
        <View style={{width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor}}/>
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 15,
    color: '#000000'
  },
  sectionView: {
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    color: '#999999'
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    backgroundColor: global.pageBackgroundColor
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});
