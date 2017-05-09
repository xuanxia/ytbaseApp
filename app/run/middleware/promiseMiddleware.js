/**
 * Created by kangxiaojian on 2017/4/26.
 */
import {Alert,InteractionManager} from 'react-native';
import {HTTP_SERVICE_KEY,httpDomain} from '../config';
import {dealParams} from '../../base/utils';
const baseUrl = httpDomain[HTTP_SERVICE_KEY]['dataServer'];
const httpMethod = 'get';

function getAjaxPrams(params) {
    let url = baseUrl + params.url;
    const headers = Object.assign({
//        "Accept":"text/plain,application/json,*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    },params.headers);
    const ajaxParams = Object.assign({
        method: httpMethod,
        load: false,
        "credentials": "include",
    },params);
    const bodyData = dealParams(ajaxParams.body);   //转换参数
    if(ajaxParams.method.toUpperCase() === 'POST'){
        ajaxParams.body = bodyData;
    }else{
        url += '?' + bodyData;
        delete ajaxParams.body;
    }
    ajaxParams.headers = headers;
    return {
        url:url,
        requestBody:ajaxParams
    }
}
export default store => next => async action =>{
    const {
        params={},
        type
    } = action;

   const {url,requestBody} = getAjaxPrams(params);
    return new Promise((resolve, reject)=>{
        fetch(url,requestBody)
            .then(async (response)=>{
                const resData = await response.json();
                return {
                    headers: response.headers.map,
                    resData
                }
         }).then((response)=>{
            const {resData,headers} = response;
            InteractionManager.runAfterInteractions(() => {
                 next({resData,params: params.body, type,headers});
                 resolve(resData);
            });
         }).catch((error)=>{
            Alert.alert(error);
        })
    });
}