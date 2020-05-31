import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Row, Col, Avatar, Typography, Divider } from "antd";

const { Paragraph } = Typography;

class SimilarCreater extends React.Component {
  state = {
    similarCreater: [],
    createrInfo: [],
  };

  componentWillReceiveProps = (nextprops) => {
    if (this.props.userid != nextprops) {
      this.similarCreaterCall(nextprops.userID);
    }
  };

  similarCreaterCall = (userID) => {
    axios
      .get("http://127.0.0.1:8000/similar-artist/?userID=" + userID)
      .then((res) => {
        this.setState({
          similarCreater: res.data.result,
        });
        this.similarCreaterInformationCall(res.data.result);
      });
  };

  similarCreaterInformationCall = async (data) => {
    var _createrInfo = [];
    for (var i in data) {
      await axios
        .get("http://127.0.0.1:8000/mypage/user/?id=" + data[i])
        .then((res) => {
          console.log(res);
          _createrInfo[i] = res.data[0].username;
        });
    }
    this.setState({
      createrInfo: _createrInfo,
    });
  };

  render() {
    const { createrInfo } = this.state;
    console.log(createrInfo);
    return (
      <Row justify="center" align="middle">
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Similar Creators
        </Divider>
        {createrInfo.map((createrInfo, index) => (
          <Col justify="center" align="middle">
            <Avatar
              size={50}
              style={{
                marginTop: "15px",
                marginBottom: "10px",
                marginLeft: "15px",
                marginRight: "15px",
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <Typography>
              <Paragraph>{createrInfo}</Paragraph>
            </Typography>
          </Col>
        ))}
      </Row>
    );
  }
}

export default SimilarCreater;
