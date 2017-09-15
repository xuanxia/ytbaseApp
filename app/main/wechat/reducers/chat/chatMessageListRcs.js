/**
 * Created by kangxiaojian on 2017/9/15.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const initMessages = fromJS(
    [
        /* {
         id:'',
         type:'1' // 1： 自己发的 2：接收别人的
         data:{
            type:1, // 1 字符数据 2 图片 3小视屏
            news:'B 你好'
         },
         user：{
            // 当是接收消息时
            // 会返回用户信息
         }
         }*/
    ]);
export default  createReducer(initMessages,{
    [types.GET_LOCAL_MESSAGE_LIST]:(state,action)=>{
        return state.merge(action.resData);
    },
});
