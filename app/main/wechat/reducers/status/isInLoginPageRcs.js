/**
 * Created by kangxiaojian on 2017/9/25.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const initData = fromJS({
    flag:false
});

export default  createReducer(initData,{
    [types.CHANGE_IN_LOGIN_PAGE]:(state,action) => {
        return state.merge(action.params.body);
    },
});
