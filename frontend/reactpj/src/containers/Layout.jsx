import React from 'react';
import { Layout, Menu, Drawer, Avatar, Button, Form, Row, Col, Input } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import logo from '../img/Web_logo.png';
import RegistrationForm from './Signup';
import LoginForm from './Login';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    state = {
        visible : false,
        signupDrawer : false,
        loginDrawer : false,
        username : "Franklin Park",
      };

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                this.props.onAuth(e.target.elements[0].value, e.target.elements[1].value, e.target.elements[2].value);
            }
            this.props.history.push('/');
        });
    }

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

      showSignupDrawer = () => {
        this.setState({
          signupDrawer: true,
        });
      };
    
      onSignupDrawerClose = () => {
        this.setState({
          signupDrawer: false,
        });
      };

      showLoginDrawer = () => {
        this.setState({
          loginDrawer: true,
        });
      };
    
      onLoginDrawerClose = () => {
        this.setState({
          loginDrawer: false,
        });
      };

    render(){
        return (
            <div>
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
                <Content>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                    <div className="site-layout-content" style={{background: '#fff', padding: '0px', minHeight: '280px'}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>IIF is on Developing</Footer>
            </Layout>
            <Drawer
            title={this.state.username}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{paddingBottom : 80}}
            footer={
                    this.props.isAuthenticated ?
                    <div
                        style={{textAlign : 'right',
                        }}>
                        <NavLink to={{ pathname: `/` }}>
                            <Button style = {{ marginRight : 8}}>
                                Logout
                            </Button>
                        </NavLink>
                    </div>
                    :
                    <div
                        style={{textAlign : 'right',
                        }}>
                            <Button onClick = {this.showSignupDrawer} style = {{ marginRight : 8}}>
                                SignUp
                            </Button>
                            <Button onClick = {this.showLoginDrawer}type = "primary" style = {{ marginRight : 8}}>
                                Login
                            </Button>
                    </div>
            }
            >
                <Avatar icon = {<UserOutlined />}/>
                <p></p>
                <NavLink to={{ pathname: `/` }}>
                    <p>Arts</p>
                </NavLink>
                <NavLink to={{ pathname: `/` }}>
                    <p>Status</p>
                </NavLink>
                <NavLink to={{ pathname: `/` }}>
                    <p>Ranking</p>
                </NavLink>
                <NavLink to={{ pathname: `/` }}>
                    <p>Arts Synthesis</p>
                </NavLink>
                <Drawer
                    title = "SignUp"
                    width = {360}
                    closable = {false}
                    onClose = {this.onSignupDrawerClose}
                    visible = {this.state.signupDrawer}
                    bodyStyle = {{paddingBottom : 80}}
                    // footer = {
                    //     <div style = {{ textAlign : 'right', }}>
                    //         <Button onclick = {this.onClose} style = {{marginRight : 8}}>
                    //             Cancel
                    //         </Button>
                    //         <Button onClick={this.onClose} type="primary">
                    //             Submit
                    //         </Button>
                    //     </div>
                    // }
                    >
                        <RegistrationForm></RegistrationForm>
                    {/* <Form layout = "vertical" hideRequiredMark>
                        <Row gutter = {16}>
                            <Col span = {12}>
                                <Form.Item name = "username" label = "Username"
                                 rules = {[{required : true, message : 'Please enter username'}]}>
                                     <Input placeholder = "Please enter username" />
                                 </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter = {16}>
                            <Col span = {12}>
                                <Form.Item name = "password" label = "Password"
                                 rules = {[{required : true, message : 'Please enter password'}]}>
                                     <Input.Password placeholder = "Please enter password" />
                                 </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter = {16}>
                            <Col span = {12}>
                                <Form.Item name = "password_verification" label = "Password_verification"
                                 rules = {[{required : true, message : 'Please enter same password above'}, 
                                 ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                 }),
                                 ]}
                                 dependencies={['password']} hasFeedback>
                                     <Input.Password placeholder = "Please enter same password above" />
                                 </Form.Item>
                            </Col>
                        </Row>
                    </Form> */}
                </Drawer>
                <Drawer
                    title = "LogIn"
                    width = {360}
                    closable = {false}
                    onClose = {this.onLoginDrawerClose}
                    visible = {this.state.loginDrawer}
                    bodyStyle = {{paddingBottom : 80}}
                    // footer = {
                    //     <div style = {{ textAlign : 'right', }}>
                    //         <Button onclick = {this.onClose} style = {{marginRight : 8}}>
                    //             Cancel
                    //         </Button>
                    //         <Button onClick={this.onClose} type="primary">
                    //             Submit
                    //         </Button>
                    //     </div>
                    // }
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
        logout : () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(CustomLayout);
