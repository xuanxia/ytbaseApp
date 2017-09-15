/**
 * Created by kangxiaojian on 2017/9/15.
 */
import * as types from '../actionTypes';
// key 为userId
function SendMessage(key,body) {
    return {
        type:types.SEND_MESSAG,
        params:{
            url:'localStage://setArrItem',
            key,
            body,
        }
    }
}
function ReceiveMessage(key,body) {
    return {
        type:types.RECEIVE_MESSAG,
        params:{
            url:'localStage://setArrItem',
            key,
            body,
        }
    }
}
function GetLocMessageList(key) {
    return {
        type:types.RECEIVE_MESSAG,
        params:{
            url:'localStage://getList',
            key,
        }
    }
}
export const doSendMessage = (key,getData)=> (dispatch, getState) => dispatch(SendMessage(key,getData));
export const doReceiveMessage = (key,getData)=> (dispatch, getState) => dispatch(ReceiveMessage(key,getData));
export const doGetLocMessageList = (key)=> (dispatch, getState) => dispatch(GetLocMessageList(key));
