/**
 * Created by kangxiaojian on 2017/4/26.
 */


import { connectStore } from '../../base/utils';

import * as reducers from './reducers'
import * as actions from './actions';
import * as actionTypes from './actions/actionTypes';
import routers from './router';
export default ()=>{
    connectStore.reducers = reducers;     //设置路由
    connectStore.actions = actions;
    connectStore.routes = routers;
    connectStore.actionTypes = actionTypes;
}


