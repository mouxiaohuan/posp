import React, { Component } from 'react'; // 引入了React
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import {Config} from '../../help/config';

import { initialState, goLogin } from '../../redux/action/loginAction';

import styles from './style/login.less';

import { Spin, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

/* 登录 */
const mapStateToProps = (state, ownProps) => {
    let { Common, Login } = state;
    return {
        loading: Common.loading,
        loginInfo: Login.loginInfo
    }
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ initialState, goLogin }, dispatch)
});

@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		passwordDirty: false,
    		loginBtnText: '登录'
    	};
    }
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() { 
        const {actions} = this.props;
        // 初始化数据
        actions.initialState();
    }
  	handleSubmit = (e) => { // 登录
    	e.preventDefault();
        const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        username: username,
                        password: password	
                    };
                actions.goLogin(loginParams);
		    }
	    });
	}
	// 验证用户名
	checkUsername = (rule, value, callback) => {
		const form = this.props.form;
        if (!value) {
            callback();
        } else if (!Config.checkEng(value)) {
	    	callback(Config.message.usernameEng);
	    } else {
	    	callback();
	    }
	}
	// 验证密码
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
	    if (value && this.state.passwordDirty) {
	    	form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}
	render() {
        const { loading, loginInfo, form } = this.props;
        const getFieldDecorator = form.getFieldDecorator;
		return (
		<div className="login-container">	
			<div className="login-form">
				<Spin tip="载入中..." spinning={loading}>
					<div className="login-logo">
				        <span>POSP系统</span>
				    </div>
					<Form onSubmit={this.handleSubmit}>
				        <FormItem hasFeedback>
                            {getFieldDecorator('username', { initialValue: 'sosout', rules: [{ required: true, message: Config.message.usernameInput }, { validator: this.checkUsername }] })(
                                <Input size="large" placeholder="用户名" maxLength="6" />
                            )}
				        </FormItem>
				        <FormItem hasFeedback>
                            {getFieldDecorator('password', { rules: [{ required: true, message: Config.message.passwordInput }, { validator: this.checkPassword }] })(
                                <Input size="large" type="password" placeholder="密码" maxLength="6" />
                            )}
				        </FormItem>
				        <FormItem>
				            <Button type="primary" htmlType="submit" size="large" loading={loginInfo.length > 0 ? true : false}>{loginInfo.length > 0 ? '登录中...' : '登录'}</Button>
				        </FormItem>
			        </Form>
		        </Spin>
			</div>
		</div>
		);
	}
}