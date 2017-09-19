/**
 * Created by kangxiaojian on 2017/9/18.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const intLodaing = fromJS({
    isLoading:false,
    loadingText:'加载中...'
});

export default  createReducer(intLodaing,{
    [types.LOADING_START]:(state,action) => {
        return state.merge({isLoading:true,loadingText:action.loadingText});
    },
    [types.LOADING_STOP]:(state,action)=>{
        return state.merge({isLoading:false});
    }
});

