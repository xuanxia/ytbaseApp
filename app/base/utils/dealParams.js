/**
 * Created by kangxiaojian on 2017/4/27.
 */
export default (obj) => {
    if (obj instanceof Array) {
        return( ( obj== null ) ? "" : obj.toString() );
    }
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
        value = obj[name];
        if(value instanceof Array) {
            for(i in value) {
                subValue = value[i];
                fullSubName = name + '['+ i +']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += arguments.callee(innerObj) + '&';
            }

        } else if(value instanceof Object) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '&';
        }
        else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};