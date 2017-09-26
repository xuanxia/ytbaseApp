/**
 * Created by kangxiaojian on 2017/9/18.
 */
import * as types from '../actionTypes';
function AddUserProfile(body) {
    return {
        type:types.ADD_USER_PROFILE,
        params:{
            url:'/api/user.add_user_profile',
            body,
            load:true
        }
    }
}
function GetUserProfile(body) {
    return {
        type:types.GET_USER_PROFILE,
        params:{
            url:'/api/user.get_user_profile',
            body,
            load:true
        }
    }
}


export const doAddUserProfile = (getData)=> (dispatch, getState) => dispatch(AddUserProfile(getData));
export const doGetUserProfile = (getData)=> (dispatch, getState) => dispatch(GetUserProfile(getData));
