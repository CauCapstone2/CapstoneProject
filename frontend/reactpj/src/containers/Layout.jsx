import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Drawer, } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import logo from '../img/Web_logo.png';
import '../css/MainPage.css';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    state = {
        visible : false,
        username : "Franklin Park",
    };
    
    showDrawer = () => {
        this.setState({
          visible : true,
        });
      }
    
      onClose = () => {
        this.setState({
          visible : false,
        });
      }

    render(){
        return (
            <div>
            <Layout className="layout">
                <Header>
                    <div className="image-container">
                        <img className = "img" src={logo} alt="" />
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
                <Content>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                    <div className="site-layout-content" style={{background: '#fff', padding : '0px', minHeight: '280px'}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>IIF is on developing process</Footer>
            </Layout>
            <Drawer
            title={this.state.username}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            >
                <Avatar icon = {<UserOutlined />}>
                <p>Username</p>
                </Avatar>
                <p></p>
                <p></p>
                <p>Arts</p>
                <p>Status</p>
                <p>Ranking</p>
                <p>Arts Synthesis</p>
            </Drawer>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(CustomLayout);