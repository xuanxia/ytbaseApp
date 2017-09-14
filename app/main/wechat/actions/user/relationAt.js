/**
 * Created by kangxiaojian on 2017/9/9.
 */
import * as types from '../actionTypes';
function AddFriend(body) {
    return {
        type:types.ADD_FRIEND,
        params:{
            url:'/api/relation.add_friend',
            body,
            load:true
        }
    }
}
function AcceptFriend(body) {
    return {
        type:types.ACCEPT_FRIEND,
        params:{
            url:'/api/relation.add_friend',
            body,
            load:true
        }
    }
}
function DelFriend(body) {
    return {
        type:types.DEL_FRIEND,
        params:{
            url:'/api/relation.add_friend',
            body,
            load:true
        }
    }
}
export const doAddFriend = (getData)=> (dispatch, getState) => dispatch(AddFriend( getData));
export const doAcceptFriend = (getData)=> (dispatch, getState) => dispatch(AcceptFriend( getData));
export const doDelFriend = (getData)=> (dispatch, getState) => dispatch(DelFriend( getData));
