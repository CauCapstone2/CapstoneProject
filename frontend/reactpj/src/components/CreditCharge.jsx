import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Divider, Row, Radio, Input } from "antd";
import UserInfo from "../UserInfo";
import { connect } from "react-redux";

class CreditCharge extends React.Component {
  state = {
    creditAmount: null,
    otherCreditInput: false,
  };
  handleOnChange = (e) => {
    this.setState({
      creditAmount: e.target.value,
    });
  };

  otherCreditClicked = () => {
    this.setState({
      otherCreditInput: true,
    });
  };

  handleCharge = () => {};

  handleCancel = () => {};

  render() {
    console.log(this.props.userid);
    return (
      <Modal
        title="Charge Credit"
        centered={true}
        visible={this.props.creditModal}
        onOk={this.props.CreditModalOK}
        onCancel={this.props.CreditModalCancel}
        footer={[
          <Button onClick={this.props.CreditModalCancel}>Cancel</Button>,
          <Button type="primary">Charge</Button>,
        ]}
        width="60vh"
      >
        <Row align="middle" justify="center">
          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Current User Info
          </Divider>
          <UserInfo userID={this.props.userid} />
          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Amount of Charge
          </Divider>
          <Radio.Group
            onChange={(e) => this.handleOnChange(e)}
            defaultValue="a"
            buttonStyle="solid"
          >
            <Radio.Button style={{ marginRight: "5px" }} value="a">
              10
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value="b">
              100
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value="c">
              500
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value="d">
              1000
            </Radio.Button>
          </Radio.Group>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={this.otherCreditClicked}
          >
            Other Amount
          </Button>
          {this.state.otherCreditInput ? (
            <Input
              style={{ width: "30vh", marginTop: "10px" }}
              placeholder="Type amount of credit"
            />
          ) : null}
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(CreditCharge);
