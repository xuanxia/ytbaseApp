/**
 * Created by kangxiaojian on 2017/4/26.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const userInfoData = fromJS({
    nickName:'',
    token:'',
});

export default  createReducer(userInfoData,{
    [types.NODE_CLUB_LOGIN]:(state,action) => {
        console.log(action);
        return state;
    }
});