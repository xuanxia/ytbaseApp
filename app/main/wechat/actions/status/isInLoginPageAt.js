/**
 * Created by kangxiaojian on 2017/9/25.
 */
import * as types from '../actionTypes';
function ChangeInLoginPageStatus(body) {
    return {
        type:types.CHANGE_IN_LOGIN_PAGE,
        params:{
            body,
        }
    }
}

export const doChangeInLoginPageStatus= (getData)=> (dispatch, getState) => dispatch(ChangeInLoginPageStatus(getData));