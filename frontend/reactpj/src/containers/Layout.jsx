import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Drawer, } from 'antd';
import { NavLink } from 'react-router-dom';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render(){
        return (
            <Layout className="layout">
                <Header>
                    <div className="image-container">
                        <NavLink to={{ pathname: `/main/` }}>
                            <img className = "img" src={logo} alt="" />
                        </NavLink>
                    </div>
                    <Menu theme="dark" mode="horizontal" style = {{float : 'right'}}>
                    <Menu.Item key="1">SEARCH</Menu.Item>
                    <Menu.Item key="2">VISION</Menu.Item>
                    <Menu.Item key="3" onClick = {this.showDrawer}>MENU<MenuOutlined/></Menu.Item>
                    </Menu>
                </Header>
                {/* <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                <Menu.Item key="1"><MenuOutlined />MENU</Menu.Item>
                    {
                        this.props.isAuthenticated ?             
                        <Menu.Item onClick = {this.props.logout} style={{float: 'right'}} key="3">
                            Logout
                        </Menu.Item>     
                            :
                        <Menu.Item style={{float: 'right'}} key="3">
                            <Link to = "/login">LOG IN / SIGN UP</Link>
                        </Menu.Item>
                    }
                </Menu>
                </Header> */}
                <Content style={{ padding: '0 50px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                    <div className="site-layout-content" style={{background: '#fff', padding: '24px', minHeight: '280px'}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(CustomLayout);