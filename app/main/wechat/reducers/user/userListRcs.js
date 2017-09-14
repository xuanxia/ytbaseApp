/**
 * Created by kangxiaojian on 2017/9/6.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const userInfoData = fromJS({
   count:0,
   rows:[
       /* {
           id:'',
           account:'',
           password:'',
           createdAt:'',
           updatedAt:''
       }*/
   ]
});

export default  createReducer(userInfoData,{
    [types.QUERY_USER_LIST]:(state,action)=>{
        //这里（包括其他所有的接口）不对是否有resData做校验 统一在promiseMiddleware中处理
        return state.merge(action.resData.data);
    },
    [types.QUERY_USER_LIST_WITH_PAGE]:(state,action)=>{
        const  initRows = state.get('rows');
        return state.merge({rows:initRows.concat(action.resData.data.rows)});
    },
    [types.CLEAN_QUERY_USER_LIST]:(state,action)=>{
        return state.merge({rows:[]});
    }
});

