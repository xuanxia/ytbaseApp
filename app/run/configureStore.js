/**
 * Created by kangxiaojian on 2017/4/26.
 */
import thunkMiddleware from 'redux-thunk';
import {isLoginMiddleware,promiseMiddleware} from './middleware';
import { connectStore } from '../base/utils';
import * as reducers from './reducers'
import * as actions from './actions';
import * as actionTypes from './actions/actionTypes';
import weChatConfigureStore from '../main/wechat/configureStore';
export default (initialState)=>{
    weChatConfigureStore();
    connectStore.middlewares = [thunkMiddleware,promiseMiddleware,isLoginMiddleware];
    connectStore.reducers = reducers;
    connectStore.actions = actions;
    connectStore.actionTypes = actionTypes;
    return connectStore.createStore(initialState);
}