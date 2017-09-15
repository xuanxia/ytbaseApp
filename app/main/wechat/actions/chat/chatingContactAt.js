/**
 * Created by kangxiaojian on 2017/9/15.
 */
import * as types from '../actionTypes';

function GetLocChatterList(key) {
    return {
        type:types.GET_LOCAL_CHATER_LIST,
        params:{
            url:'localStage://getList',
            key,
        }
    }
}
export const doGetLocChatterList = (key)=> (dispatch, getState) => dispatch(GetLocChatterList(key));
