/**
 * Created by kangxiaojian on 2017/9/15.
 */

import {AsyncStorage} from 'react-native';
export default async function (params) {
    const method = params.url.substr(13,params.url.length);
    const locUtil = new LocUtil();
    return await locUtil[method](params)
}

class LocUtil {
    constructor(){

    }
    async get(params){
        const  {key} = params;
       //TODO 类型校验
        return await AsyncStorage.getItem(key);
    }
    async getList(params){
        const  {key} = params;
        //TODO 类型校验
        const result = await AsyncStorage.getItem(key);
        return JSON.parse(result);
    }
    async set(params){
        const  {key,body} = params;
       //TODO 类型校验
        return await AsyncStorage.setItem(key,JSON.stringify(body));
    }
    async del(params){
        const  {key} = params;
        //TODO 类型校验
        return await AsyncStorage.removeItem(key);
    }
    //key保存的是一个数组 往这个数组中push一项
    async setArrItem(params){
        const  {key,body} = params;
        const temp = await AsyncStorage.getItem(key);
        let Arr = [];
        if(temp){
            Arr = JSON.parse(temp);
        }else{
            return Arr;
        }
        //TODO 根据opt 可以自定义插入位置
        Arr.push(body);
        await AsyncStorage.setItem(key,JSON.stringify(Arr));
        return Arr;
    }

    //key保存的是一个数组 删除数组中的某一项 通过id
    // opt {type:1,key:'id',value:'100'}
    async delArrItem(params){
        const  {key,opt} = params;
        const temp = await AsyncStorage.getItem(key);
        let Arr = [];
        if(temp){
            Arr = JSON.parse(temp);
        }else{
            return Arr;
        }
        if(opt.type == 1 ){
            Arr.remove(opt.key,opt.value)
        }
        await AsyncStorage.setItem(key,JSON.stringify(Arr));
        return Arr;
    }
}

Array.prototype.indexOf = function(key,val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(key,val) {
    let index = this.indexOf(key,val);
    if (index > -1) {
        this.splice(index, 1);
    }
};