import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from 'antd';
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
            this.props.history.push('/');
        });
    }

    render(){
        return (
            <Form
            name="register"
            onSubmitCapture={this.handleSubmit}
            scrollToFirstError
            >
            <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username!'}]}>
                <Input />
            </Form.Item>

            <Form.Item name="password" label="password" rules={[{required: true, message: 'Please input your password!'}]} hasFeedback>
                <Input.Password />
            </Form.Item>

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
                <Input.Password />
            </Form.Item>

            <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                        Signup
                    </Button>
                        Or 
                    <NavLink style={{marginRight:'10px'}} 
                        to='/login/'> Login
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

