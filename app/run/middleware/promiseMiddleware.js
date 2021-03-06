/**
 * Created by kangxiaojian on 2017/4/26.
 */
import {Alert,InteractionManager,DeviceEventEmitter} from 'react-native';
import {HTTP_SERVICE_KEY,httpDomain} from '../config';
import {dealParams} from '../../base/utils';
const baseUrl = httpDomain[HTTP_SERVICE_KEY]['dataServer'];
import {AsyncStorage} from 'react-native';
import {locUtil,connectStore} from '../../base/utils';

export default store => next => async action =>{
    const {
        params={},
        type
    } = action;
    // 非接口请求的action 处理
    if(!params.url){
        next(action);
        return;
    }

    //对本地数据处理的action
    if(params.url.substr(0,13) == 'localStage://'){
        const resData = await locUtil(params).catch((error)=>{
            //TODO 错误处理
            console.log(error);
            return ;
        });
        if(resData){
            next({resData,params,type});
            return resData;
        }
        return;
    }
   const {url,requestBody} = await getAjaxPrams(params);
    // 对需要转菊花的action处理
    if(params.load){
        const isLoading = store.getState().get('loadingRcs').toJS().isLoading;
        if(!isLoading){
            next({type:connectStore.actionTypes.LOADING_START,loadingText:params.loadingText||'加载中....'});
        }
    }
   return new Promise((resolve, reject)=>{
        fetch(url,requestBody)
            .then(async (response)=>{
                next({type:connectStore.actionTypes.LOADING_STOP});
                    const resData = await response.json();
                    console.log(url+'接口返回数据');
                    console.log(resData);
                    return {
                        headers: response.headers.map,
                        resData
                    }
         }).then((response)=>{
            const {resData,headers} = response;
            //未登录处理
            if(resData.code ==='NO_LOGIN_ERROR'){
                const isInLogingPage = store.getState().get('isInLoginPageRcs').toJS().flag;
                if(!isInLogingPage){
                    DeviceEventEmitter.emit('goLoginPage');
                }
                reject();
            }
            //TODO resData返回的错误统一处理
            InteractionManager.runAfterInteractions(() => {
                 next({resData,params: params.body, type,headers});
                 resolve(resData);
            });
         }).catch((error)=>{
            next({type:connectStore.actionTypes.LOADING_STOP});
            //TODO 错误统一处理
            Alert.alert(error.toString());
            reject();
        })
    });
}
async function getAjaxPrams(params) {
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
        if(!ajaxParams.body){
            ajaxParams.body = {};
        }
        ajaxParams.body['token'] = await AsyncStorage.getItem('TOKEN') || '';
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