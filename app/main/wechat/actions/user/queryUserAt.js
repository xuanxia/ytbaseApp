/**
 * Created by kangxiaojian on 2017/9/6.
 */
import * as types from '../actionTypes';
function QueryUserList(type,body,load=true) {
    return {
        type,
        params:{
            url:'/api/user.query_list',
            body,
            load
        }
    }
}

function CleanUserList() {
    return {
        type:types.CLEAN_QUERY_USER_LIST,
        params:{

        }
    }
}
// 第一页 或者不分页
export const doQueryUserList = (getData)=> (dispatch, getState) => dispatch(QueryUserList(types.QUERY_USER_LIST,getData,true));
// 分页
export const doQueryUserListWithPage = (getData,load)=>(dispatch, getState)=>dispatch(QueryUserList(types.QUERY_USER_LIST_WITH_PAGE,getData,load));
//清空列表
export const doCleanUserList = ()=>(dispatch,getState)=>dispatch(CleanUserList());