/**
 * Created by kangxiaojian on 2017/4/26.
 */
import NodeClubLogin from './container/user/login';
import ContentPage from './container/content/content';
const routes = {
    //登录页
    NodeClubLogin:{screen: NodeClubLogin},
    //内容页
    ContentPage:{screen:ContentPage}
};
export default routes;