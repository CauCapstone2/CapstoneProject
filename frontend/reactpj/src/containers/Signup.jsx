import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button, Row, Col } from 'antd';
import { Form } from '@ant-design/compatible';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';

class RegistrationForm extends React.Component{
    state = {
        confirmDirty : false,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                this.props.onAuth(e.target.elements[0].value, e.target.elements[1].value, e.target.elements[2].value);
            }
            //this.props.history.push('/');
            //above is for refreshing to mainpage.
        });
    }

    render(){
        return (
            <Form
            name="register"
            onSubmitCapture={this.handleSubmit}
            scrollToFirstError
            layout = "vertical">
                <Row gutter = {16}>
                    <Col>
                        <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username!'}]}>
                            <Input placeholder = "Please enter Username"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter = {16}>
                    <Col>
                        <Form.Item name="password" label="password" rules={[{required: true, message: 'Please input your password!'}]} hasFeedback>
                            <Input.Password placeholder = "Please enter Password"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter = {16}>
                    <Col>
                        <Form.Item name="confirm" label="confirm" dependencies={['password']} hasFeedback rules={[{required: true, message: 'Please confirm your password!'},
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                            }),
                        ]}>
                            <Input.Password placeholder = "Please enter same password above"/>
                        </Form.Item>
                    </Col>
                </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                    SignUp
                </Button>
                    Or 
                <NavLink style={{marginRight:'10px'}} to='/login/'>
                    <Button style = {{marginRight : '10px', marginLeft : '10px'}}>
                        LogIn
                    </Button>
                </NavLink>
            </Form.Item> 
            </Form>
        );
    }
};

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading : state.loading,
        error : state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);

