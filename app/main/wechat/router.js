/**
 * Created by kangxiaojian on 2017/8/17.
 */
import SearchScreen from './container/SearchScreen.js';
import ContactDetailScreen from './container/ContactDetailScreen.js';
import ChattingScreen from './container/ChattingScreen.js';
import MomentScreen from './container/MomentScreen.js';
import ScanResultScreen from './container/ScanResultScreen.js';
import LoginScreen from './container/LoginScreen';
import RegisterScreen from './container/RegisterScreen';
import NewFriendsScreen from './container/NewFriendsScreen';
//以下4个为底部tab路由 加在这里方便调转调用
import HomeScreen from './container/HomeScreen';
import ContactsScreen from './container/ContactsScreen.js';
import FindScreen from './container/FindScreen.js';
import MeScreen from './container/MeScreen.js';
import {connectScreen} from '../../base/utils'
const routes = {
    Login:{screen:connectScreen(LoginScreen,{actions:['doLogin'],storeRcs:['userRcs']})},
    Register:{screen:connectScreen(RegisterScreen,{actions:['doRegister'],storeRcs:['userRcs']})},
    Search:{screen:connectScreen(SearchScreen)},
    ContactDetail:{screen:connectScreen(ContactDetailScreen)},
    Chatting:{screen:connectScreen(ChattingScreen,{
        actions:['doSendMessage','doReceiveMessage','doGetLocMessageList','doGetLocChatterList'],
        storeRcs:['chatContactListRcs','chatMessageListRcs']
    })},
    Moment:{screen:connectScreen(MomentScreen)},
    ScanResult:{screen:connectScreen(ScanResultScreen)},
    NewFriends:{screen:connectScreen(NewFriendsScreen)},

    // 跳转这里的KEY值没有底部tab
    HomeScreen:{screen:connectScreen(HomeScreen)},
    ContactsScreen:{screen:connectScreen(ContactsScreen)},
    FindScreen:{screen:connectScreen(FindScreen)},
    MeScreen:{screen:connectScreen(MeScreen)},
};

export default routes;
