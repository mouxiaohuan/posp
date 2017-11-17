import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import {Config} from '../help/config';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
		this.state = {
			openKeys: openKeys,
			selectKey:''
		};
	}
    onOpenChange = (openKeys) => {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    Config.localItem('OPENKEY', nextOpenKeys);
	    this.setState({ openKeys: nextOpenKeys });
	}
  	getAncestorKeys = (key) => {
	    const map = {
	      sub3: ['sub2'],
	    };
	    return map[key] || [];
	}
	render() {
		const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
		let tempSecondArray=[];
		let defaultKey=[];
        let defaultOpenKeys=[];
		if(this.props.menuData!==null) {
            this.props.menuData.map((value, index) => {
            	if(value.id === this.props.firstSelectKey){
            		if(value.children&&value.children.length!==0){
                        defaultOpenKeys.push(value.children[0].id);
                        value.children.map((value, index) => {
                            let tempThirdArray=[];
                            if(value.children&&value.children.length!==0){
                                defaultKey.push(value.children[0].id);
                                value.children.map((value, index) => {
                                	let temp=<Menu.Item key={value.id}><Link to={value.url}>{value.name}</Link></Menu.Item>
                                    tempThirdArray.push(temp)
								})
							}
							let temp =  <SubMenu key={value.id} title={<span><Icon type="dot-chart" /><span className="nav-text">{value.name}</span></span>}>
											{tempThirdArray}
										</SubMenu>
                            tempSecondArray.push(temp)
                        })
					}
				}
            })
        }
		return (
			<Menu defaultOpenKeys={defaultOpenKeys} openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} theme="dark" mode={this.props.mode} defaultSelectedKeys={defaultKey}>
				{tempSecondArray}
	        </Menu>
		)
	}
}