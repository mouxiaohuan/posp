import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import {Config} from '../../help/config';



// 公共头部
import { Lheader } from './lheader';
// 公共菜单
import { Lmenu } from './lmenu';
// 公共底部
import { Lfooter } from './lfooter';

// 布局样式
import './style/layout.less';
import { Layout, Menu, Breadcrumb, Icon ,message} from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const tempMenuData=[{"id":"C_cms","name":"系统管理","icon":"fa-gear","url":"#","parentId":"0","children":[{"id":"CC_cms","name":"基础数据管理","icon":"fa-database","url":null,"parentId":"C_cms","children":[{"id":"CCC_cms","name":"参数管理","icon":"","url":"paramManage/toTab","parentId":"CC_cms","children":null},{"id":"CCF_cms","name":"银行信息管理","icon":"","url":"bankManage/toTab","parentId":"CC_cms","children":null},{"id":"CCI_cms","name":"业务产品码查询","icon":"","url":"businessProduct/toTab","parentId":"CC_cms","children":null},{"id":"CCL_cms","name":"接口资源查询","icon":"","url":"interfaceResource/toTab","parentId":"CC_cms","children":null}]},{"id":"CF_cms","name":"任务管理","icon":"fa-tasks","url":null,"parentId":"C_cms","children":[{"id":"CFC_cms","name":"批量任务管理","icon":"","url":"batchJobManage/toTab","parentId":"CF_cms","children":null}]}]},{"id":"F_cms","name":"商户管理","icon":"fa-server","url":null,"parentId":"0","children":[{"id":"FF_cms","name":"业务条线管理","icon":"fa-th-list","url":null,"parentId":"F_cms","children":[{"id":"FFC_cms","name":"业务条线信息管理","icon":"","url":"sysBusiness/toTab","parentId":"FF_cms","children":null}]},{"id":"FI_cms","name":"应用管理","icon":"fa-qrcode","url":null,"parentId":"F_cms","children":[{"id":"FIC_cms","name":"应用信息管理","icon":"","url":"ApplicationInfo/toTab","parentId":"FI_cms","children":null},{"id":"FIF_cms","name":"应用接口管理","icon":"","url":"AppResouce/toTab","parentId":"FI_cms","children":null}]}]},{"id":"I_cms","name":"渠道管理","icon":"fa-cubes","url":null,"parentId":"0","children":[{"id":"IC_cms","name":"支付渠道管理","icon":"fa-cubes","url":null,"parentId":"I_cms","children":[{"id":"ICC_cms","name":"渠道信息管理","icon":"","url":"rulechannel/toTab","parentId":"IC_cms","children":null},{"id":"ICF_cms","name":"渠道银行限额管理","icon":"","url":"rulechannelbanklimit/toTab","parentId":"IC_cms","children":null},{"id":"ICI_cms","name":"渠道路由管理","icon":"","url":"ruleroute/toTab","parentId":"IC_cms","children":null},{"id":"ICL_cms","name":"渠道优先级管理","icon":"","url":"rulechannelpriority/toTab","parentId":"IC_cms","children":null}]}]},{"id":"L_cms","name":"监控管理","icon":"fa-th","url":null,"parentId":"0","children":[{"id":"LC_cms","name":"预警管理","icon":"fa-th","url":null,"parentId":"L_cms","children":[{"id":"LCC_cms","name":"接收人管理","icon":"","url":"msgReceiveManage/toTab","parentId":"LC_cms","children":null},{"id":"LCF_cms","name":"短信邮件模板管理","icon":"","url":"msgEmailTemplManage/toTab","parentId":"LC_cms","children":null},{"id":"LCI_cms","name":"预警规则管理","icon":"","url":"warnRuleManage/toTab","parentId":"LC_cms","children":null},{"id":"LCL_cms","name":"预警消息查询","icon":"","url":"warnMessage/toTab","parentId":"LC_cms","children":null}]}]},{"id":"O_cms","name":"综合查询","icon":"fa-search-plus","url":null,"parentId":"0","children":[{"id":"OC_cms","name":"开户查询","icon":"fa-clone","url":null,"parentId":"O_cms","children":[{"id":"OCC_cms","name":"单笔四要素开户查询","icon":"","url":"singleAccountQuery/toTab","parentId":"OC_cms","children":null},{"id":"OCF_cms","name":"批量四要素开户查询","icon":"","url":"batchAccountQuery/toTab","parentId":"OC_cms","children":null},{"id":"OCI_cms","name":"单笔实名开户查询","icon":"","url":"singleRealAccount/toTab","parentId":"OC_cms","children":null}]},{"id":"OF_cms","name":"绑卡查询","icon":"fa-credit-card","url":null,"parentId":"O_cms","children":[{"id":"OFC_cms","name":"单笔绑卡查询","icon":"","url":"singleBindCard/toTab","parentId":"OF_cms","children":null},{"id":"OFF_cms","name":"批量绑卡查询","icon":"","url":"batchBindCard/toTab","parentId":"OF_cms","children":null}]},{"id":"OI_cms","name":"交易管理","icon":"fa-exchange","url":null,"parentId":"O_cms","children":[{"id":"OIC_cms","name":"单笔代扣查询","icon":"","url":"singleChargeTrade/toTab","parentId":"OI_cms","children":null},{"id":"OIF_cms","name":"批量代扣查询","icon":"","url":"batchChargeTrade/toTab","parentId":"OI_cms","children":null},{"id":"OII_cms","name":"单笔代付查询","icon":"","url":"singleWithdrawTrade/toTab","parentId":"OI_cms","children":null},{"id":"OIL_cms","name":"批量代付查询","icon":"","url":"batchWithdrawTrade/toTab","parentId":"OI_cms","children":null},{"id":"OIN_cms","name":"批量代付明细查询","icon":"","url":"batchWithdrawTransactionTrade/toTab","parentId":"OI_cms","children":null},{"id":"OIR_cms","name":"异常交易查询","icon":"","url":"unusualTrade/toTab","parentId":"OI_cms","children":null},{"id":"OIU_cms","name":"标的出款查询","icon":"","url":"bidPutoutTrade/toTab","parentId":"OI_cms","children":null}]},{"id":"OL_cms","name":"订单管理","icon":"fa-reorder","url":null,"parentId":"O_cms","children":[{"id":"OLC_cms","name":"单笔代扣查询","icon":"","url":"orderSingleWithhold/toTab","parentId":"OL_cms","children":null},{"id":"OLF_cms","name":"批量代扣查询","icon":"","url":"orderBatchWithholdTrade/toTab","parentId":"OL_cms","children":null},{"id":"OLI_cms","name":"批量代扣拆单明细查询","icon":"","url":"orderBatchWithholdNewTrade/toTab","parentId":"OL_cms","children":null},{"id":"OLL_cms","name":"单笔代付查询","icon":"","url":"orderSinglePay/toTab","parentId":"OL_cms","children":null},{"id":"OLR_cms","name":"批量代付查询","icon":"","url":"orderBatchPayTrade/toTab","parentId":"OL_cms","children":null},{"id":"OLO_cms","name":"批量代付明细查询","icon":"","url":"orderBatchPayNewTrade/toTab","parentId":"OL_cms","children":null},{"id":"OLU_cms","name":"标的出款查询","icon":"","url":"orderBidPutOut/toTab","parentId":"OL_cms","children":null}]}]},{"id":"R_cms","name":"账户管理","icon":"fa-columns","url":null,"parentId":"0","children":[{"id":"RC_cms","name":"平台账户管理","icon":"fa-newspaper-o","url":null,"parentId":"R_cms","children":[{"id":"RCC_cms","name":"平台账户查询","icon":"","url":"accountManage/toTab","parentId":"RC_cms","children":null},{"id":"RCF_cms","name":"风险金充值","icon":"","url":"riskAccountManage/toTab","parentId":"RC_cms","children":null},{"id":"RCI_cms","name":"活动费充值","icon":"","url":"activityFeesAccountManage/toTab","parentId":"RC_cms","children":null},{"id":"RCL_cms","name":"收益充值","icon":"","url":"incomeAccountManage/toTab","parentId":"RC_cms","children":null},{"id":"RCO_cms","name":"收益提现","icon":"","url":"incomeWithdrawManage/toTab","parentId":"RC_cms","children":null},{"id":"RCR_cms","name":"捐赠出款","icon":"","url":"donateAccountManage/toTab","parentId":"RC_cms","children":null}]},{"id":"RF_cms","name":"客户账户管理","icon":"fa-users","url":null,"parentId":"R_cms","children":[{"id":"RFC_cms","name":"客户账户查询","icon":"","url":"customerAccountManage/toTab","parentId":"RF_cms","children":null},{"id":"RFF_cms","name":"账户冻结解冻","icon":"","url":"customerAccountManage/toFreezeTab","parentId":"RF_cms","children":null}]},{"id":"RI_cms","name":"标的账户管理","icon":"fa-tags","url":null,"parentId":"R_cms","children":[{"id":"RIC_cms","name":"标的账户查询","icon":"","url":"bidAccountManage/toTab","parentId":"RI_cms","children":null}]}]}];

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
	constructor(props) {
		super(props);
		const collapsed = (Config.localItem('COLLAPSED') === 'YES')? true : false;
		this.menuData='';
		this.state = {
			collapsed: collapsed,
    		mode: collapsed ? 'vertical' : 'inline',
			firstSelectKey:''
		};
	}
	onCollapse = (collapsed) => {
		if(collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
	    this.setState({
	      collapsed,
	      mode: collapsed ? 'vertical' : 'inline'
	    });
	}
	toggle = (collapsed) => {
		if(collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
	    this.setState({
	      collapsed: collapsed,
	      mode: collapsed ? 'vertical' : 'inline'
	    });
  	}
  	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	setCurrentMenuId(index){
        console.log(index);
        console.log(index&&this.menuData[index].id);
        this.setState({firstSelectKey:index&&this.menuData[index].id});

	}
    componentWillMount(){
        //
        // getMenu().then((backData) => {
        //     if (backData.error) {
        //         message("获取菜单错误，请查看网络");
        //     }
        //     else {
        //
        //         this.state.menuData=backData;
        //     }
        // });

		this.menuData=tempMenuData;
		this.state.firstSelectKey=this.menuData[0].id
	}
	render() {
        const props={
            menuData:this.menuData,
        	currentMenuId:this.setCurrentMenuId.bind(this),
            firstSelectKey:this.state.firstSelectKey,
        };
		return (
		<Layout className="layout">
	        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
		        <div className="layout-logo">
		        	<Link to="/home">
			        	<img className="logo-img" src="dist/image/logo-font-withe.png"/>
			        	<span className="logo-text"  >POSP系统</span>
		        	</Link>
		        </div>
	        	<Lmenu mode={ this.state.mode } {...props} />
	        </Sider>
	        <Layout>
	          <Lheader{...props}/>
	          <Content className="layout-content">
	           	{this.props.children}
	          </Content>
	          <Lfooter />
	        </Layout>
	    </Layout>
		);
	}
}

export default Main;