/**
 * Created by kangxiaojian on 2017/4/26.
 */
import MainIndex from './container/index'
import NodeClubLogin from './container/user/login';
import ContentPage from './container/content/content';
import MySwiper from './container/swiper';
import {connectScreen} from '../../base/utils'
const routes = {
    //列表首页
    MainIndex:{screen:connectScreen(MainIndex)},
    //登录页
    NodeClubLogin:{screen: connectScreen(NodeClubLogin,{actions:['doNodeClubLogin'],storeRcs:['loginRcs']})},
    //内容页
    ContentPage:{screen:connectScreen(ContentPage)},
    //轮播图
    MySwiper:{screen:connectScreen(MySwiper)}
};



export default routes;