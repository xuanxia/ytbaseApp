/**
 * Created by kangxiaojian on 2017/9/6.
 */
import * as types from '../actionTypes';
function Register(body) {
    return {
        type:types.REGISTER,
        params:{
            url:'/api/ignore/user.register',
            body,
            load:true
        }
    }
}
export const doRegister = (getData)=> (dispatch, getState) => dispatch(Register( getData));