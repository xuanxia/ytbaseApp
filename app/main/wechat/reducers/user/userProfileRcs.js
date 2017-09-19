/**
 * Created by kangxiaojian on 2017/9/4.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const initUserProfile = fromJS({
    id:'',
    nickName:'',
    avatar:'https://staticonline.hipac.cn/item/201606/06301713172785.jpeg@200w',
    account:'',
    password:'',
    createdAt:'',
    updatedAt:''
});

export default  createReducer(initUserProfile,{
    [types.ADD_USER_PROFILE]:(state,action) => {
        return state.merge(action.resData);
    },
    [types.GET_USER_PROFILE]:(state,action) => {
        return state.merge(action.resData.data);
    },

});
