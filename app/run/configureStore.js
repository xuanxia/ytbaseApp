/**
 * Created by kangxiaojian on 2017/4/26.
 */
import thunkMiddleware from 'redux-thunk';
import {isLoginMiddleware,promiseMiddleware} from './middleware';
import { connectStore } from '../base/utils';
import {httpDomain,HTTP_SERVICE_KEY} from './config'
import * as reducers from './reducers'
import * as actions from './actions';
import * as actionTypes from './actions/actionTypes';
import wechatConfigureStore from '../main/wechat/configureStore';
import io from 'socket.io-client';
const socket = io(httpDomain[HTTP_SERVICE_KEY].socketServe);
export default (initialState)=>{
    wechatConfigureStore();
    connectStore.middlewares = [thunkMiddleware,promiseMiddleware,isLoginMiddleware];
    connectStore.reducers = reducers;
    connectStore.actions = actions;
    connectStore.actionTypes = actionTypes;
    connectStore.socket = socket;
    return connectStore.createStore(initialState);
}