import React, { Component } from "react";
import { Col, Avatar, Typography } from "antd";

const { Title, Paragraph } = Typography;

class MypageInfo extends Component {
  componentDidMount() {
    this.props.userInformationCall();
  }
  render() {
    return (
      <div>
        <Col span={8} justify="center" align="middle">
          {this.props.userInfo.map((info, index) => (
            <div>
              <Avatar
                size={100}
                style={{ marginTop: "15px", marginBottom: "10px" }}
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <Typography>
                <Title>
                  {info.username} {this.props.userid}
                </Title>
                <Paragraph type="secondary">{info.email}</Paragraph>
                <Paragraph>
                  Web developer, not only for performance but design factors
                  also.
                </Paragraph>
              </Typography>
            </div>
          ))}
        </Col>
      </div>
    );
  }
}

export default MypageInfo;
