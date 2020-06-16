import React from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../modules/auth";
import * as keys from "../kakaosecurityinfo";
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
           
        this.creditStatusChange();
        this.props.tid_delete();
        this.setState({
          purchase_done: true,
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  creditStatusChange = () => {
    let form_data = new FormData();
    form_data.append("user", this.props.userid);
    form_data.append("increase_credit", this.props.increaseCredit);
    axios.post("http://3.34.190.67/credit/create/", form_data);
  };

  render() {
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
    tid_delete: () => dispatch(actions.tidDataDeleteaction()),
    tid_check: () => dispatch(actions.tidDataCheckaction()),
  };
};

const mapStateToProps = (state) => {
  return {
    tid: state.auth.tid,
    userid: state.auth.userid,
    increaseCredit: state.auth.credit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creditsuccess);
