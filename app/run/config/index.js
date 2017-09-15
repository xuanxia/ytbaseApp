/**
 * Created by kangdaye on 16/7/21.
 */
import {
    AsyncStorage,
    Platform,
    NativeModules
} from 'react-native';

const HTTP_SERVICE_KEY = 'test';

const httpDomain = {
    online: {

    },
    syntax: {

    },
    daily: {

    },
    test: {
        dataServer:'http://127.0.0.1:7001',
        socketServe:'http://127.0.0.1:7001'
    }
};

export {
    HTTP_SERVICE_KEY,
    httpDomain
}