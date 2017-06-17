/**
 * Created by kangxiaojian on 2017/4/26.
 */
import * as types from '../actionTypes';
function TopicsList(body) {
    return {
        type:types.TOPICS_LIST,
        params:{
            url:'/topics',
            body,
            load:true
        }
    }
}
export const doTopicsList = (getData)=> (dispatch, getState) => dispatch(TopicsList(getData));
