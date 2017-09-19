/**
 * Created by kangxiaojian on 2017/9/4.
 */
import * as types from '../actionTypes';
function Login(body) {
    return {
        type:types.LOGIN,
        params:{
            url:'/api/user.login',
            body,
            load:true
        }
    }
}
function Logout() {
    return {
        type:types.LOGOUT,
        params:{
            url:'/api/user.logout',
            load:true
        }
    }
}

export const doLogin = (getData)=> (dispatch, getState) => dispatch(Login( getData));
export const doLogout = ()=> (dispatch, getState) => dispatch(Logout());



