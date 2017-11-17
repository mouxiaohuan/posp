
import React, {Component, PropTypes} from 'react'; // react核心
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router'; // 创建route所需
import {Config} from '../help/config';
import layout from '../layout/layout'; // 布局界面
import login from '../pages/login/login'; // 登录界面

class Roots extends Component {
	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}
const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/home/homeIndex').default)
    }, 'home');
};

//database
const bankManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/database/bankManage').default)
    }, 'bankManage');
};

const paramManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/database/paramManage').default)
    }, 'paramManage');
};



// 登录验证
const requireAuth = (nextState, replace) => {
	let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
	if(token > 7200000) { // 模拟Token保存2个小时
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/home" component={layout} onEnter={requireAuth}>
			<IndexRoute getComponent={home} onEnter={requireAuth} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
			<Route path="/bankManage/toTab" getComponent={bankManage} onEnter={requireAuth} />
			<Route path="/paramManage/toTab" getComponent={paramManage} onEnter={requireAuth} />
		</Route>
		<Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
			<IndexRoute component={login} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
		</Route>
		<Redirect from="*" to="/home" />
	</Router>
);

export default RouteConfig;
