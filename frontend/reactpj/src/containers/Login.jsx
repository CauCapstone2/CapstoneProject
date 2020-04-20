import React from 'react';
import { Input, Button, Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';
import '@ant-design/compatible/assets/index.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class LoginForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.onAuth(e.target.elements[0].value, e.target.elements[1].value)
            }
        });
        console.log('problem point');
        console.log(this.props);
        //this.props.history.push('/');
        //above is for refreshing to mainpage.
    }

  render(){
      let errorMessage = null;
      if(this.props.error) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
      }

      return (
        <div>
            {errorMessage}
            {
              this.props.loading ?  
              <Spin indicator={antIcon} />
                :
              <Form onSubmit={this.handleSubmit} className="login-form" layout = "vertical">
                  <Row gutter = {16}>
                      <Col>
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder = "Please enter Username"/>
                        </Form.Item>
                      </Col>
                  </Row>
                  <Row gutter = {16}>
                      <Col>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder = "Please enter Password"/>
                        </Form.Item>
                      </Col>
                  </Row>
  
                  <Form.Item>
                      <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                          Login
                      </Button>
                      Or
                      <NavLink style={{marginRight:'10px'}} to='/signup/'>
                          <Button style = {{marginRight : '10px', marginLeft : '10px'}}>
                              SignUp
                          </Button>
                      </NavLink>
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
        loading : state.loading,
        error : state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (username, password) => dispatch(actions.authLogin(username,password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);