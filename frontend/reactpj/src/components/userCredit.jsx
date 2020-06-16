import React from "react";
import axios from "axios";
import { Typography } from "antd";
import { connect } from "react-redux";
import * as urls from "../urlAddress";

const { Paragraph } = Typography;

class UserCredit extends React.Component {
  state = {
    myCredit: null,
  };

  componentWillMount() {
    console.log("entered");
    this.getMyCredit(this.props.userid);
  }

  getMyCredit = (userid) => {
    axios.get(urls.user_credit + userid).then((res) => {
      console.log(res);
      this.setState({
        myCredit: res.data[0].credit,
      });
    });
  };

  render() {
    return (
      <div>
        {this.props.mypage === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paragraph>current Credit : </Paragraph>
            <Paragraph strong>{this.state.myCredit}</Paragraph>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userid,
  };
};

export default connect(mapStateToProps)(UserCredit);
