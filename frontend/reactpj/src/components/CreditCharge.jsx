import React from "react";
import axios from "axios";
import { Modal, Button, Divider, Row, Radio, Input, Typography } from "antd";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import * as actions from "../modules/auth";
import * as keys from "../kakaosecurityinfo";
const { Paragraph } = Typography;

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

  handleCharge = () => {
    let price_for_credit = this.state.creditAmount * 100;

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
            Authorization: `KakaoAK ${keys.kakao_admin_key}`,
          },
        }
      )
      .then((res) => {
        this.props.tid_get(res.data.tid, this.state.creditAmount);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paragraph>Check whether this account is yours</Paragraph>
            <UserInfo userID={this.props.userid} />
          </div>
          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Amount of Charge
          </Divider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paragraph>
              Chargement Fee : {this.state.creditAmount * 100}won
            </Paragraph>
            <Radio.Group
              onChange={(e) => this.handleOnChange(e)}
              defaultValue={0}
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
              <Radio.Button
                style={{ marginLeft: "10px" }}
                onClick={this.otherCreditClicked}
              >
                Other Amount
              </Radio.Button>
            </Radio.Group>
          </div>

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
    userid: state.auth.userid,
    tid: state.auth.tid,
    increaseCredit: state.auth.credit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tid_get: (tid, creditAmount) =>
      dispatch(actions.tidDataGetaction(tid, creditAmount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCharge);
