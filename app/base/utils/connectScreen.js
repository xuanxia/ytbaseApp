/**
 * Created by kangxiaojian on 2017/5/24.
 */
import connectComponent from './connect';
import { bindActionCreators } from 'redux';
import connectStore from './connectStore';
export default (screen,options={})=> {
    const actions = options.actions;
    const storeRcs = options.storeRcs;
    return connectComponent(screen,(state)=>{
        const nextState = state.toJS();
        let result = {};
        ((storeRcs instanceof Array) && storeRcs.length)?
            storeRcs.map((item)=>{
                result[item] = nextState[item];
            }): (result = nextState);
        return result;
    },(dispatch)=>{
        const allActions = connectStore.actions;
        let tempAction = {};
        (actions instanceof Array) && actions.length ?
            actions.map((item)=>{
                tempAction[item] = allActions[item];
            }) : (tempAction = allActions);
        return {
            actions: bindActionCreators(tempAction, dispatch),
            dispatch: dispatch
        }
    })
}