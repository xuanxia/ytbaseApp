/**
 * Created by kangxiaojian on 2017/9/6.
 */
import * as types from '../actionTypes';
function QueryUserList(body) {
    return {
        type:types.REGISTER,
        params:{
            url:'/api/user.query_list',
            body,
            load:true
        }
    }
}
export const doQueryUserList = (getData)=> (dispatch, getState) => dispatch(QueryUserList( getData));