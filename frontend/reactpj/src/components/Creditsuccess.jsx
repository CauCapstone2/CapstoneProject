import React from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as keys from "./kakaosecurityinfo";
import { NavLink } from "react-router-dom";

class Creditsuccess extends React.Component {
  state = {
    purchase_done: false,
  };
  componentWillMount() {
    this.props.tid_check();
  }
  handleCharge = () => {
    var not_modified_pg = this.props.location.search;
    var pg_token = not_modified_pg.substr(10);
    console.log("pg_token : " + pg_token);
    console.log("tid : " + this.props.tid);

    const params = new URLSearchParams();
    params.append("cid", "TC0ONETIME");
    params.append("partner_order_id", "partner_order_id");
    params.append("partner_user_id", "partner_user_id");
    params.append("tid", this.props.tid);
    params.append("pg_token", pg_token);

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://kapi.kakao.com/v1/payment/approve",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `KakaoAK ${keys.kakao_admin_key}`,
          },
        }
      )
      .then((res) => {
        console.log("this.props : " + this.props);
        console.log("success");
        this.props.tid_delete();
        this.setState({
          purchase_done: true,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  render() {
    console.log(this.props);
    console.log("search : " + this.props.location.search);
    return (
      <div>
        {this.state.purchase_done ? (
          <Result
            status="success"
            title="Your Purchase is Authorized."
            subTitle="Thank you for purchasing our credit. It will help creators thanks to you."
            extra={
              <NavLink to={{ pathname: "/mypage" }}>
                <Button type="primary" key="success">
                  Back to Mypage
                </Button>
              </NavLink>
            }
          />
        ) : (
          <Result
            title="Your Purchase is right before to be completed."
            subTitle="Click the button below to complete your purchase."
            extra={
              <Button type="primary" key="done" onClick={this.handleCharge}>
                Confirm Purchase
              </Button>
            }
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tid_delete: () => dispatch(actions.tidDataDelete()),
    tid_check: () => dispatch(actions.tidDataCheck()),
  };
};

const mapStateToProps = (state) => {
  return {
    tid: state.tid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creditsuccess);
