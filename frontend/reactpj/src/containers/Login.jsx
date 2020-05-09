import React from 'react';
import { Input, Button, Spin, Row, Col, Alert } from 'antd';
import { LoadingOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import '@ant-design/compatible/assets/index.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(e.target.elements[0].value, e.target.elements[1].value)
            }
        });
    }

    closeTabs = () => {
        this.props.loginDrawerClose();
        this.props.firstDrawerClose();
    }

    changeintoSignup = () => {
        this.props.loginDrawerClose();
        this.props.signupDrawerOpen();
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.closeTabs();
        }
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <div>
                    <Alert message="Login Error" description={this.props.error.message} type="error" closable showIcon />
                </div>
            );
        }

        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?
                        <Spin indicator={antIcon} />
                        :
                        <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
                            <Row gutter={16}>
                                <Col>
                                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input placeholder="Please enter Username" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col>
                                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password placeholder="Please enter Password" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Login
                      </Button>
                      Or
                      {/*this side should be modified */}
                                <Button onClick={this.changeintoSignup} style={{ marginRight: '10px', marginLeft: '10px' }}>
                                    SignUp
                        </Button>
                            </Form.Item>
                        </Form>
                }
            </div>
        );
    }
};

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        loginDrawerClose: () => dispatch(actions.loginDrawerClose()),
        firstDrawerClose: () => dispatch(actions.firstDrawerClose()),
        signupDrawerOpen: () => dispatch(actions.signupDrawerOpen()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);