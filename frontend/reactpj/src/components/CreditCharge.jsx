import React from "react";
import axios from "axios";
import { Modal, Button, Divider, Row, Radio, Input } from "antd";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as keys from "./kakaosecurityinfo";

class CreditCharge extends React.Component {
  state = {
    creditAmount: null,
    otherCreditInput: false,
  };
  handleOnChange = (e) => {
    this.setState({
      creditAmount: e.target.value * 100,
    });
    console.log("in handler" + this.state.creditAmount);
  };

  otherCreditClicked = () => {
    this.setState({
      otherCreditInput: true,
    });
  };

  handleCharge = () => {
    console.log("in handleCharge" + this.state.creditAmount);
    let price_for_credit = this.state.creditAmount;

    const params = new URLSearchParams();
    params.append("cid", "TC0ONETIME");
    params.append("partner_order_id", "partner_order_id");
    params.append("partner_user_id", "partner_user_id");
    params.append("item_name", "credit_purchase");
    params.append("quantity", 1);
    params.append("total_amount", price_for_credit);
    params.append("tax_free_amount", 0);
    params.append("approval_url", "http://localhost:3000/purchase/success");
    params.append("fail_url", "http://localhost:3000/purchase/fail");
    params.append("cancel_url", "http://localhost:3000/purchase/cancel");

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://kapi.kakao.com/v1/payment/ready",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `KakaoAK ${keys.kakao_admin_key}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.tid);
        this.props.tid_get(res.data.tid);
        if (this.props.tid !== null) {
          window.location.assign(res.data.next_redirect_pc_url);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  handleCancel = () => {};

  render() {
    return (
      <Modal
        title="Charge Credit"
        centered={true}
        visible={this.props.creditModal}
        onOk={this.props.CreditModalOK}
        onCancel={this.props.CreditModalCancel}
        footer={[
          <Button onClick={this.props.CreditModalCancel}>Cancel</Button>,
          <Button onClick={this.handleCharge} type="primary">
            Charge
          </Button>,
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
            <Radio.Button style={{ marginRight: "5px" }} value={10}>
              10
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value={100}>
              100
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value={500}>
              500
            </Radio.Button>
            <Radio.Button style={{ marginRight: "5px" }} value={1000}>
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
              onChange={(e) => this.handleOnChange(e)}
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
    tid: state.tid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tid_get: (tid) => dispatch(actions.tidDataGet(tid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCharge);

// import { Result, Button } from 'antd';

// ReactDOM.render(
//   <Result
//     status="success"
//     title="Successfully Purchased Cloud Server ECS!"
//     subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
//     extra={[
//       <Button type="primary" key="console">
//         Go Console
//       </Button>,
//       <Button key="buy">Buy Again</Button>,
//     ]}
//   />,
//   mountNode,
// );
