import React from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import * as keys from "./kakaosecurityinfo";

class Creditsuccess extends React.Component {
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

    // curl -v -X POST 'https://kapi.kakao.com/v1/payment/approve' \
    // -H 'Authorization: KakaoAK xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
    // --data-urlencode 'cid=TC0ONETIME' \
    // --data-urlencode 'tid=T1234567890123456789' \
    // --data-urlencode 'partner_order_id=partner_order_id' \
    // --data-urlencode 'partner_user_id=partner_user_id' \
    // --data-urlencode 'pg_token=xxxxxxxxxxxxxxxxxxxx'

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
      })
      .catch((res) => {
        console.log(res);
      });
  };

  render() {
    console.log(this.props);
    console.log("search : " + this.props.location.search);
    return (
      <Result
        status="success"
        title="Successfully Purchased Credit for using IIF"
        subTitle="You can use credits at downloading artifacts or other services"
        extra={[
          <Button type="primary" key="done" onClick={this.handleCharge}>
            Go Mainpage
          </Button>,
        ]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tid: state.tid,
  };
};

export default connect(mapStateToProps)(Creditsuccess);
