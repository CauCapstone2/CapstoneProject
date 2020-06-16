import React from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../modules/auth";
import { NavLink } from "react-router-dom";

class Creditcancel extends React.Component {
  componentWillMount() {
    this.props.tid_delete();
  }

  render() {
    return (
      <Result
        status="error"
        title="Your purchase has been canceled"
        subTitle="If you want to proceed purchase again, please retry via Mypage."
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

export default connect(null, mapDispatchToProps)(Creditcancel);
