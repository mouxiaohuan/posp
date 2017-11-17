import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Table,Tabs,Form ,Row, Col, Input, Button, Icon } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

/* 参数管理*/


@Form.create()
export default class ParemManage extends React.Component {
    constructor(props) {
    	super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: '参数管理', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },


        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
            expand: false,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    _editColumn(key){

        /*此处写你要编辑的动作*/
        console.log(key)
    }
    _onTableChange(pagination, filters, sorter) {
        /*Table发生变化*/
        console.log('params', pagination, filters, sorter);
    }
    _getSearchFields() {
        const columns = [{
                type:"text",
                name: 'paramName1',
                placeholder: '参数名',
                defaultValue:'',
                maxLength:'',
                style:{},
                require:{

                },
            },{
                type:"text",
                name: 'paramName2',
                placeholder: '参数名',
                defaultValue:''
            },{
                type:"select",
                name: 'paramName1',
                placeholder: '参数名',
                defaultValue:'0',
                option:["待开通","已开通"]
            }
        ];

        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`)(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item



    render() {
        const columns = [{
            title: '商户名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: '参数编号',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        }, {
            title: '操作',
            dataIndex: 'option',
            render: (text, record) =>{
                return <div><Icon type="edit" />
                        <a onClick={()=>this._editColumn(record.key)}>编辑</a>
                    </div>}
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            option: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            option: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            option: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'Jim Red',
            age: 32,
            option: 'London No. 2 Lake Park',
        }];

        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }

		return (	
		<div className="pospContent">
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
            {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>
                <div className="header">
                    <Form
                        className="ant-advanced-search-form"
                        onSubmit={this.handleSearch}
                    >
                        <Row gutter={40}>{()=>this._getSearchFields()}</Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    清除
                                </Button>
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                    更多 <Icon type={this.state.expand ? 'up' : 'down'} />
                                </a>
                            </Col>
                        </Row>
                    </Form>

                </div>

                <Table columns={columns} className="table" dataSource={data} onChange={()=>this._onTableChange} footer={() => {
                    return <span>一共10页</span>
                }} />

            </TabPane>)}

            </Tabs>

		</div>
		);
	}
}

ParemManage.contextTypes = {
};




