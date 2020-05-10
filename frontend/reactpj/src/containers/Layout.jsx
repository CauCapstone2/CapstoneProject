import React from 'react';
import { Layout, Menu, Drawer, Avatar, Button, message } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import logo from '../img/Web_logo.png';
import RegistrationForm from './Signup';
import LoginForm from './Login';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

    render() {
        
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="image-container">
                            <NavLink to={{ pathname: `/main/` }}>
                                <img className="img" src={logo} alt="" />
                            </NavLink>
                        </div>
                        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
                            <Menu.Item key="1">
                                <NavLink to={{ pathname: `/search/` }}>
                                    SEARCH
                    </NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">VISION</Menu.Item>
                            <Menu.Item key="3" onClick={this.props.showDrawer}>MENU<MenuOutlined /></Menu.Item>
                        </Menu>
                    </Header>

                    <Content style={{ minHeight: '87vh' }}>
                        <div className="site-layout-content" style={{ background: '#fff', padding: '0px', minHeight: '280px' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>IIF is on Developing</Footer>
                </Layout>
                <Drawer
                    title={this.props.username}
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.firstdrawer}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        this.props.isAuthenticated ?
                            <div
                                style={{
                                    textAlign: 'right',
                                }}>
                                <Button onClick={this.props.logout} style={{ marginRight: 8 }}>
                                    Logout
                        </Button>
                            </div>
                            :
                            <div
                                style={{
                                    textAlign: 'right',
                                }}>
                                <Button onClick={this.props.showSignupDrawer} style={{ marginRight: 8 }}>
                                    SignUp
                            </Button>
                                <Button onClick={this.props.showLoginDrawer} type="primary" style={{ marginRight: 8 }}>
                                    Login
                            </Button>
                            </div>
                    }
                >
                    <Avatar icon={<UserOutlined />} />
                    <p></p>
                    <NavLink onClick={this.props.onClose} to={{ pathname: `/` }}>
                        <p>Arts</p>
                    </NavLink>
                    <NavLink onClick={this.props.onClose} to={{ pathname: `/` }}>
                        <p>Status</p>
                    </NavLink>
                    <NavLink onClick={this.props.onClose} to={{ pathname: `/` }}>
                        <p>Ranking</p>
                    </NavLink>
                    <NavLink onClick={this.props.onClose} to={{ pathname: `/` }}>
                        <p>Arts Synthesis</p>
                    </NavLink>
                    <Drawer
                        title="SignUp"
                        width={360}
                        closable={false}
                        onClose={this.props.onSignupDrawerClose}
                        visible={this.props.signupdrawer}
                        bodyStyle={{ paddingBottom: 80 }}
                    >
                        <RegistrationForm></RegistrationForm>
                    </Drawer>
                    <Drawer
                        title="LogIn"
                        width={360}
                        closable={false}
                        onClose={this.props.onLoginDrawerClose}
                        visible={this.props.logindrawer}
                        bodyStyle={{ paddingBottom: 80 }}
                    >
                        <LoginForm />
                    </Drawer>
                </Drawer>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        showDrawer: () => dispatch(actions.firstDrawerOpen()),
        onClose: () => dispatch(actions.firstDrawerClose()),
        showLoginDrawer: () => dispatch(actions.loginDrawerOpen()),
        onLoginDrawerClose: () => dispatch(actions.loginDrawerClose()),
        showSignupDrawer: () => dispatch(actions.signupDrawerOpen()),
        onSignupDrawerClose: () => dispatch(actions.signupDrawerClose()),

    }
}

function mapReduxStateToReactProps(state) {
    return {
        firstdrawer: state.firstdrawer,
        logindrawer: state.logindrawer,
        signupdrawer: state.signupdrawer,
        error: state.error,
    }
}
export default connect(mapReduxStateToReactProps, mapDispatchToProps)(CustomLayout);
