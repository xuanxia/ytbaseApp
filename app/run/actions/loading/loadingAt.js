/**
 * Created by kangxiaojian on 2017/9/18.
 */
import * as types from '../actionTypes';
function LoadingStart() {
    return {
        type:types.LOADING_START,
        params:{

        }
    }
}
function LoadingStop() {
    return {
        type:types.LOADING_STOP,
        params:{
        }
    }
}
export const doLoadingStart = ()=> (dispatch, getState) => dispatch(LoadingStart());
export const doLoadingStop = ()=> (dispatch, getState) => dispatch(LoadingStop());