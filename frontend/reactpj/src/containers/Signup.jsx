import React from "react";
import { Input, Button, Row, Col, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const success_info = () => {
  message.success("SignUp has Successively Done");
};
const error_info = () => {
  // message.error("Please type correct information again")
};

class RegistrationForm extends React.Component {
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
    });
  };

  closeTabs = () => {
    this.props.signupDrawerClose();
    this.props.firstDrawerClose();
  };

  changeintoSignup = () => {
    this.props.signupDrawerClose();
    this.props.loginDrawerOpen();
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.closeTabs();
      success_info();
    } else {
      error_info();
    }
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form
            name="register"
            onSubmitCapture={this.handleSubmit}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col>
                <Form.Item
                  label="username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Please enter Username" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="password"
                  label="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Please enter Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="confirm"
                  label="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Please enter same password above" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                onClick={this.submitonClick}
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                SignUp
              </Button>
              Or
              <Button
                onClick={this.changeintoSignup}
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                LogIn
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    signupDrawerClose: () => dispatch(actions.signupDrawerClose()),
    firstDrawerClose: () => dispatch(actions.firstDrawerClose()),
    loginDrawerOpen: () => dispatch(actions.loginDrawerOpen()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
