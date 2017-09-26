import {createStore,applyMiddleware,compose} from 'redux';
import {combineReducers} from 'redux-immutablejs';
import devTools from 'remote-redux-devtools';
import Immutable from 'immutable';
class ContentStore{
    _middlewares = [];
    _reducers = {};
    _actions= {};
    _routes = {};
    _actionTypes = {};
    set routes(routes){
        this._routes = Object.assign(this._routes,routes);
    }
    set reducers(reducers){
        this._reducers = Object.assign(this._reducers,reducers);
    }
    set actions(actions){
        this._actions = Object.assign(this._actions,actions);
    }
    set middlewares(middlewares){
        this._middlewares = this._middlewares.concat(middlewares);
    }
    set actionTypes(actionTypes){
        this._actionTypes = Object.assign(this._actionTypes,actionTypes);
    }

    get routes(){
        return this._routes;
    }
    get middlewares(){
        return this._middlewares;
    }
    get actionTypes(){
        return this._actionTypes;
    }
    get actions(){
        return this._actions;
    }
    get reducers(){
        return this._reducers;
    }
    createStore(initialState,devToolsConfig={
        name:'ios',
        hostname: 'localhost',
        realtime: true,
        port: 7878
    }){
        const enhancer = compose(

            applyMiddleware(...this._middlewares),
            devTools(devToolsConfig)
        );
        const store = createStore(
            combineReducers(this._reducers),
            initialState,
            enhancer
        );
        devTools.updateStore(store);
        return store;
    }
}
export default new ContentStore();