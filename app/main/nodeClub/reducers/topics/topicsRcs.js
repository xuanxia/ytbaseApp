/**
 * Created by kangxiaojian on 2017/4/26.
 */
import { createReducer } from 'redux-immutablejs';
import {fromJS} from 'immutable'
import * as types from '../../actions/actionTypes';
const topics = fromJS({
    success:true,
    data:[{
        author:{
            avatar_url:'',
            loginname:'',
        },
        author_id:'',
        content:'',
        create_at:'',
        good:'',
        id:'',
        last_reply_at:'',
        reply_count:0,
        tab:'',
        title:'',
        top:'',
        visit_count:0,
    }]
});

export default  createReducer(topics,{
    [types.TOPICS_LIST]:(state,action) => {
        return state.merge({
            data:action.resData
        });
    }
});