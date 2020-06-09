import React from "react";
import axios from "axios";
import { Typography } from "antd";
import { connect } from "react-redux";
import * as urls from "./urlAddress";

const { Paragraph } = Typography;

class UserCredit extends React.Component {
  state = {
    myCredit: null,
  };

  componentWillMount() {
    this.getMyCredit(this.props.userid);
  }

  getMyCredit = (userid) => {
    axios.get(urls.user_credit + userid).then((res) => {
      this.setState({
        myCredit: res.data, // not sure
      });
    });
  };

  render() {
    return (
      <div>
        <Paragraph>current Credit : </Paragraph>
        <Paragraph strong>{this.state.myCredit}</Paragraph>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(UserCredit);
