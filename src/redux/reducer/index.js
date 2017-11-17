import { fromJS } from 'immutable';
import {
    LOADING,
    LOADING_TABLE_DATA,
    LOAD_TABLE_DATA_SUCCESSFUL
} from '../actionType/dispatchTypes';


import Login from './loginReducer'; // 登录界面

// 初始化state数据
const initialState = {
    loading: false,
    tableDataLoading: false,
    tableData: {},
};

/**
 * 公共reducer
 * @return
 */
const Common = (state = initialState, action) => {
    switch(action.type) {
        case LOADING: // 用于页面和区块的加载中状态
            return fromJS(state).merge({loading: action.loading}).toJS();
        case LOAD_TABLE_DATA_SUCCESSFUL:
            return fromJS(state).merge({tableData: action.res,tableDataLoading:false}).toJS();
        case LOADING_TABLE_DATA:
            return fromJS(state).merge({tableDataLoading: action.flag}).toJS();
        default:
            return state;
    }
}


export { Common, Login};