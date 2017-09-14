/**
 * Created by kangxiaojian on 2017/9/12.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const contactList = fromJS({
    count:0,
    rows:[
        /* {
         id:'',
         userId:''
         nickName:'',
         avatar:'',
         sex:1,
         phone:'',
         timeLineTopPic:''
         createdAt:'',
         updatedAt:''
         }*/
    ]
});
export default  createReducer(contactList,{
    [types.QUERY_CONTACT_LIST]:(state,action)=>{
        return state.merge(action.resData.data);
    },
});
