/**
 * Created by kangxiaojian on 2017/9/6.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const userInfoData = fromJS({
   count:0,
   rows:[{
       id:'',
       nickName:'',
       avatar:'',
       account:'',
       password:'',
       createdAt:'',
       updatedAt:''
   }]
});

export default  createReducer(userInfoData,{
    [types.LOGIN]:(state,action) => {
        return state;
    },
    [types.REGISTER]:(state)=>{
        return state;
    }
});

