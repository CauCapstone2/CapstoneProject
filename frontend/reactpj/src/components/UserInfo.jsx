import React from "react";
import axios from "axios";
import { Row, Col, Avatar, Typography } from "antd";

const { Paragraph } = Typography;

class UserInfo extends React.Component {
  state = {
    userInfo: [],
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.userID !== prevProps.userID) {
      this.userInformationCall(this.props.userID);
    }
  };

  componentDidMount = () => {
    this.userInformationCall(this.props.userID);
  };

  userInformationCall = (userID) => {
    axios.get("http://3.34.190.67/mypage/user/?id=" + userID).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <Row span={8} justify="center" align="middle">
        {userInfo.map((userInfo, index) => (
          <Col justify="center" align="middle" key={index}>
            <Avatar
              size={70}
              style={{
                marginTop: "15px",
                marginBottom: "10px",
                marginLeft: "15px",
                marginRight: "15px",
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <Typography>
              <Paragraph strong="true">{userInfo.username}</Paragraph>
              <Paragraph type="secondary">{userInfo.email}</Paragraph>
            </Typography>
          </Col>
        ))}
      </Row>
    );
  }
}

export default UserInfo;
