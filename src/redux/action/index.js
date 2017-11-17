/**
 * 公共 action
 * @return
 */

import { LOADING,LOADING_TABLE_DATA,LOAD_TABLE_DATA_SUCCESSFUL,WARNING_MESSAGE } from '../actionType/dispatchTypes';

/**
 * 用于页面和区块的加载中状态
 * @return
 */
const loading = (loading) => {
    return {
        type: LOADING,
        loading
    }
}
const waringMassage = (level,info) => {
    return {
        type: WARNING_MESSAGE,
        payload: {
            level: level,
            massage: value
        }
    }
}
//设置状态为loading数据状态
const tableLoading = (flag) => {
    return {
        type: LOADING_TABLE_DATA,
        flag
    }
}


//获取list数据
const  loadTableData=(url,params) =>{
    return dispatch => {
        dispatch(tableLoading(true));
        post(url,params).then((res) => {
            dispatch(tableLoading(false));
            if(res.length > 0) {
                dispatch({
                    type: LOAD_TABLE_DATA_SUCCESSFUL,
                    res
                })
            } else {
                dispatch(waringMassage(0),"获取数据失败")
            }
        });


    }

}


export { loading,loadTableData };
