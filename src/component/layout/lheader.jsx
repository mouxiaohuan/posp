import React, { Component, PropTypes } from 'react';
import { Router,Link } from 'react-router';
import { is, fromJS } from 'immutable';
import { Layout, Menu, Icon} from 'antd';
import Config from '../../config/index';
const SubMenu = Menu.SubMenu;
const { Header } = Layout;


/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
export class Lheader extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
	}
	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	toggle = () => {
		this.props.toggle(!this.props.collapsed);
  	}
  	logout= (e) => {
  		// 模拟退出
  		if(e.key == 'logout') {
	 		Config.removeLocalItem(Config.localKey.userToken);
	  		this.context.router.push({ 
				pathname: '/login' 
			});
  		}
  	};

    changeId(e){
       this.props.currentMenuId(e.key)
    }
	render() {
    	let menu=[];
        if(this.props.menuData!==null)
        {
            this.props.menuData.map((value,index)=>{
                let temp=<Menu.Item  key={index}  >
							<Icon type="user"/><span className="nav-text">{value.name}</span>
						</Menu.Item>;
                menu.push(temp)
            })
        }

		return (
			<Header className="layout-header">
				<div  className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['0']}
					style={{ lineHeight: '64px' }}
					onClick={this.changeId.bind(this)}
				>
					{menu}

				</Menu>
	        </Header>
		)
	}
}

Lheader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

