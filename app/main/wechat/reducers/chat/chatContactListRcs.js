/**
 * Created by kangxiaojian on 2017/9/15.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const initLocalcontactList = fromJS(
    [
        /* {
         id:'',
         userId:''
         nickName:'',
         avatar:'',
         sex:1,
         phone:'',
         timeLineTopPic:''
         }*/
    ]);
export default  createReducer(initLocalcontactList,{
    [types.GET_LOCAL_CHATER_LIST]:(state,action)=>{
        return state.merge(action.resData);
    },
});
