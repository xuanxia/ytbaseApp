/**
 * Created by kangxiaojian on 2017/4/26.
 */
import * as types from '../actionTypes';
function NodeClubLogin(body) {
    return {
        type:types.NODE_CLUB_LOGIN,
        params:{
            url:'',
            body,
            load:true
        }
    }
}
export const doNodeClubLogin = (getData)=> (dispatch, getState) => dispatch(NodeClubLogin( getData));
