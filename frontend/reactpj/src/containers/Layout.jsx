import React from "react";
import {
  Layout,
  Menu,
  Drawer,
  Avatar,
  Button,
  Form,
  Row,
  Col,
  Input,
} from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import logo from "../img/Web_logo.png";
import RegistrationForm from "./Signup";
import LoginForm from "./Login";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  state = {
    visible: false,
    signupDrawer: false,
    loginDrawer: false,
    username: "Franklin Park",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
          e.target.elements[0].value,
          e.target.elements[1].value,
          e.target.elements[2].value
        );
      }
      this.props.history.push("/");
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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

  mainpageButtonClick = () => {
    this.setState({
      visible: true,
      signupDrawer: true,
    });
  };

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
            <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
              <Menu.Item key="1">
                <NavLink to={{ pathname: `/search/` }}>SEARCH</NavLink>
              </Menu.Item>
              <Menu.Item key="2">VISION</Menu.Item>
              <Menu.Item key="3" onClick={this.showDrawer}>
                MENU
                <MenuOutlined />
              </Menu.Item>
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
          <Content style={{ minHeight: "87vh" }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
            <div
              className="site-layout-content"
              style={{ background: "#fff", padding: "0px", minHeight: "280px" }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>IIF is on Developing</Footer>
        </Layout>
        <Drawer
          title={this.state.username}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            this.props.isAuthenticated ? (
              <div style={{ textAlign: "right" }}>
                <Button onClick={this.props.logout} style={{ marginRight: 8 }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: "right" }}>
                <Button
                  onClick={this.showSignupDrawer}
                  style={{ marginRight: 8 }}
                >
                  SignUp
                </Button>
                <Button
                  onClick={this.showLoginDrawer}
                  type="primary"
                  style={{ marginRight: 8 }}
                >
                  Login
                </Button>
              </div>
            )
          }
        >
          <Avatar icon={<UserOutlined />} />
          <p></p>
          <NavLink onClick={this.onClose} to={{ pathname: `/artifactlist` }}>
            <p>Arts</p>
          </NavLink>
          <NavLink onClick={this.onClose} to={{ pathname: `/artifactlist` }}>
            <p>Status</p>
          </NavLink>
          <NavLink onClick={this.onClose} to={{ pathname: `/artifactlist` }}>
            <p>Ranking</p>
          </NavLink>
          <NavLink onClick={this.onClose} to={{ pathname: `/artifactlist` }}>
            <p>Arts Synthesis</p>
          </NavLink>
          <Drawer
            title="SignUp"
            width={360}
            closable={false}
            onClose={this.onSignupDrawerClose}
            visible={this.state.signupDrawer}
            bodyStyle={{ paddingBottom: 80 }}
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
            title="LogIn"
            width={360}
            closable={false}
            onClose={this.onLoginDrawerClose}
            visible={this.state.loginDrawer}
            bodyStyle={{ paddingBottom: 80 }}
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

function mapReduxStateToReactProps(state) {
  // state가 인자인 것은 이미 규약으로 정해져 있는 것이다. redux의 store의 state이다.
  //redux의 state값이 바뀔때마다 호출되도록 규약되어있다.
  return {
    signupDrawer: state.signupDrawer, // displayNumber 's props에 들어갈 값을 여기에 적으면 되는 것이다.
  };
}

export default connect(
  mapReduxStateToReactProps,
  mapDispatchToProps
)(CustomLayout);
