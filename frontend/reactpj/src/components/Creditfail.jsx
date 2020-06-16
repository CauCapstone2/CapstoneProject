import React from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../modules/auth";
import { NavLink } from "react-router-dom";

class Creditfail extends React.Component {
  componentWillMount() {
    this.props.tid_delete();
  }

  render() {
    return (
      <Result
        status="warning"
        title="Error detected during purchase"
        subTitle="Please try again with exact information This problem might be caused by incorrect input on KakaoPay"
        extra={
          <NavLink to={{ pathname: "/mypage" }}>
            <Button type="primary" key="success">
              Back to Mypage
            </Button>
          </NavLink>
        }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tid_delete: () => dispatch(actions.tidDataDeleteaction()),
  };
};

export default connect(null, mapDispatchToProps)(Creditfail);
