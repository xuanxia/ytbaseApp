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
        dataServer:'https://cnodejs.org/api/v1'
    }
};

export {
    HTTP_SERVICE_KEY,
    httpDomain
}