/**
 * Created by kangxiaojian on 2017/4/26.
 */
import {Alert,InteractionManager} from 'react-native';
import {HTTP_SERVICE_KEY,httpDomain} from '../config';
import {dealParams} from '../../base/utils';
const baseUrl = httpDomain[HTTP_SERVICE_KEY]['dataServer'];
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
            //TODO 错误统一处理
            Alert.alert(error);
            reject();
        })
    });
}
function getAjaxPrams(params) {
    let url = baseUrl + params.url;
    /*http 协议头允许在action headers字段中自定义*/
    const headers = Object.assign({
//        "Accept":"text/plain,application/json,*/*",
        "Content-Type": "application/json"
    },params.headers);

    // 请求方式 默认POST 是否转菊花 默认不转 可在action中自定义
    const ajaxParams = Object.assign({
        method:'POST',
        load: false,
        "credentials": "include",
    },params);


    if(ajaxParams.method.toUpperCase() === 'POST'){
        ajaxParams.body = JSON.stringify(ajaxParams.body);
    }else{
        url += '?' +  dealParams(ajaxParams.body);
        delete ajaxParams.body;
    }
    ajaxParams.headers = headers;
    return {
        url:url,
        requestBody:ajaxParams
    }
}