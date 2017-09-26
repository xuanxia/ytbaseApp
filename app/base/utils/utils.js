/**
 * Created by kangxiaojian on 2017/9/7.
 */
import {Platform,NativeModules} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {HTTP_SERVICE_KEY,httpDomain} from '../../run/config';
const isEmpty =  (str) => {
    return str === null || str === '' || str === undefined;
};
const getSuffix = (path)=>{
    return path.substr(path.lastIndexOf(".")+1,path.length);
};
const getuuid = (len=10, radix)=> {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};
//get picture path
const pickerImage = () => {

    /*
    *
    * ios 遇到权限崩溃相关问题 参考这里 http://blog.csdn.net/runintolove/article/details/52087623
    * */
    // 选取图片参数
      const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照上传',
            chooseFromLibraryButtonTitle: '从相册中选择',
            storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.error) {
                let responseError = response.error;
                const errInfo = response.error.toLocaleLowerCase();
                if (errInfo.indexOf('photo library permissions') != -1) {
                    responseError = '请在设置-隐私-照片-rnwechat,点开允许访问';
                }

                if (errInfo.indexOf('camera permissions') != -1) {
                    responseError = '请在设置-隐私-相机-rnwechat,点开允许访问';
                }
                Alert.alert('', '选择图片错误: ' + responseError, [{text: '确定'}]);
                resolve('');
                return;
            }
            // 取消上传
            if (response.didCancel) {
                resolve('');
                return;
            }
            let sourceUri = '';
            if (Platform.OS === 'ios') {
                sourceUri = response.uri.replace("file://", "");
            } else {
                sourceUri = response.path;
            }
            //TODO 对图片压缩处理
            console.log(NativeModules);
            const tempUri = await NativeModules.Tool.compressImage(sourceUri);
            resolve(tempUri);
        });
    });
};

const fileUpload = async ()=>{
    const fileUri =   await pickerImage();
    if(!fileUri){return};
    const tokenJson = await getQiNiuToken('CHAT',getSuffix(fileUri));
    const token = tokenJson.data;
    let formData = new FormData();
    let file = {uri: fileUri,type:'application/octet-stream',name:''};
    formData.append('token',token);
    formData.append('file',file);
    fetch('https://upload-z2.qiniup.com',{
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:formData,
    })  .then((response)=>response.json())
        .then((responseData)=>{
            //删除压缩时产生的图片
            NativeModules.Tool.delFileByPath(fileUri);
            console.log('responseData',responseData);
        })
        .catch((error)=>{console.log('error',error)});
};

const getQiNiuToken = (saveKey,suffix)=>{
    const url = httpDomain[HTTP_SERVICE_KEY].dataServer + '/api/ignore/utils.get_qiniu_token?saveKey='+saveKey+'&suffix='+suffix;
    return new Promise((resolve, reject)=>{
        fetch(url).then((res)=>{
            return res.json();
        }).then((json)=>{
            resolve(json)
        }).catch((error)=>{
            reject(error);
        });
    });
};

export default {
    isEmpty,
    getuuid,
    pickerImage,
    getQiNiuToken,
    fileUpload
}


