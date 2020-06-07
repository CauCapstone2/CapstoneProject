import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Divider, Row, Radio, Input } from "antd";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import Kakao from "kakaojs";
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

    // var requestBody = {
    //   "cid": "TC0ONETIME",
    //   "partner_order_id": "partner_order_id",
    //   "partner_user_id": "partner_user_id",
    //   "item_name": `credit_purchase_${price_for_credit}`,
    //   "quantity": 1,
    //   "total_amount": price_for_credit,
    //   "tax_free_amount": 0,
    //   "approval_url": "http://localhost:3000/mypage",
    //   "fail_url": "http://localhost:3000/mypage",
    //   "cancel_url": "http://localhost:3000/mypage",
    // };

    const params = new URLSearchParams();
    params.append("cid", "TC0ONETIME");
    params.append("partner_order_id", "partner_order_id");
    params.append("partner_user_id", "partner_user_id");
    params.append("item_name", "credit_purchase");
    params.append("quantity", 1);
    params.append("total_amount", price_for_credit);
    params.append("tax_free_amount", 0);
    params.append("approval_url", "http://localhost:3000/mypage");
    params.append("fail_url", "http://localhost:3000/mypage");
    params.append("cancel_url", "http://localhost:3000/mypage");

    // var sending_data = [];
    // for (var property in requestBody) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(requestBody[property]);
    //     sending_data.push(encodedKey + "=" + encodedValue);
    // }
    // sending_data = sending_data.join("\\");

    // console.log(sending_data);
    
    // var form_data = new FormData();
    // form_data.append("cid", "TC0ONETIME");
    // form_data.append("partner_order_id", "partner_order_id");
    // form_data.append("partner_user_id", "partner_user_id");
    // form_data.append("item_name", "credit_purchase");
    // form_data.append("quantity", 1);
    // form_data.append("total_amount", price_for_credit);
    // form_data.append("tax_free_amount", 0);
    // form_data.append("approval_url", "http://localhost:3000/mypage");
    // form_data.append("fail_url", "http://localhost:3000/mypage");
    // form_data.append("cancel_url", "http://localhost:3000/mypage");
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://kapi.kakao.com/v1/payment/ready",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `KakaoAK ${keys.kakao_admin_key}`,
            // "Accept": "application/json;charset=UTF-8"
          },
        }
      )
      .then((res) => {
        console.log("YE");
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

//   handleCharge_sub = () => {
//     Kakao.API.request({
//       url: "/v1/payment/ready",
//       success: function (res) {
//         alert(JSON.stringify(res));
//       },
//       fail: function (error) {
//         alert(JSON.stringify(error));
//       },
//     });
//   };

  handleCancel = () => {};

  render() {
    console.log("in render" + this.state.creditAmount);
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
  };
};

export default connect(mapStateToProps)(CreditCharge);
