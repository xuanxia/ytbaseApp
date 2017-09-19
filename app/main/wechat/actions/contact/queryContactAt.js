/**
 * Created by kangxiaojian on 2017/9/12.
 */
import * as types from '../actionTypes';
function QueryContact(body) {
    return {
        type:types.QUERY_CONTACT_LIST,
        params:{
            url:'/api/contact.list',
            body,
            load:false
        }
    }
}
export const doQueryContact = (getData)=> (dispatch, getState) => dispatch(QueryContact( getData));