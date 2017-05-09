/**
 * Created by kangdaye on 16/7/20.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import connectStore from './connectStore';


const options = {
    withRef: true
};

const connectComponent = (LayoutComponent,mapStateToProps, mapDispatchToProps, mergeProps) => connect(
    mapStateToProps || function (state) {
        return state.toJS();
    },
    mapDispatchToProps || function (dispatch) {
        return {
            actions: bindActionCreators(connectStore.actions, dispatch),
            dispatch: dispatch
        }
    },
    mergeProps,
    options
)(LayoutComponent);

export default connectComponent;