import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Card,
  Statistic,
  Row,
  Col,
  Avatar,
  Typography,
  Progress,
  Divider,
  Tooltip,
} from "antd";

const { Title, Paragraph } = Typography;

// props : artifact, _new_comments, _eval_length, userInfo, evaluation
class Profile extends React.Component {
  render() {
    return (
      <Row>
        <Col
          align="middle"
          span={8}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Row
            style={{
              marginTop: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col align="middle" span={8}>
              <Card bordered={false} style={{ marginLeft: "5px" }}>
                <Statistic
                  title="Written Artifacts"
                  value={this.props.artifact.length}
                  precision={0}
                  valueStyle={{ color: "#0be881" }}
                  prefix={<Avatar>Art</Avatar>}
                />
              </Card>
            </Col>
            <Col align="middle" span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Left Comments"
                  value={this.props._new_comments.length}
                  precision={0}
                  valueStyle={{ color: "#ff3f34" }}
                  prefix={<Avatar>Com</Avatar>}
                />
              </Card>
            </Col>
            <Col align="middle" span={8}>
              <Card bordered={false} style={{ marginRight: "5px" }}>
                <Statistic
                  title="Done Evaluations"
                  value={this.props._eval_length}
                  precision={0}
                  valueStyle={{ color: "#0fbcf9" }}
                  prefix={<Avatar>Eval</Avatar>}
                />
              </Card>
            </Col>
          </Row>

          <Divider style={{ color: "#333", fontWeight: "normal" }}>
            Your Activities
          </Divider>
        </Col>
        <Col span={8} justify="center" align="middle">
          {this.props.userInfo.map((userInfo, index) => (
            <div>
              <Avatar
                size={100}
                style={{ marginTop: "15px", marginBottom: "10px" }}
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <Typography>
                <Title>{userInfo.username}</Title>
                <Paragraph type="secondary">{userInfo.email}</Paragraph>
                <Paragraph>
                  Web developer, not only for performance but design factors
                  also.
                </Paragraph>
              </Typography>
            </div>
          ))}
        </Col>

        <Col
          align="middle"
          span={8}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Row style={{ marginTop: "20%" }}>
            <Col span={4} style={{ marginRight: "3px", marginLeft: "3px" }}>
              <Tooltip title="Creative">
                <Progress
                  strokeColor="#D2691E"
                  type="circle"
                  percent={this.props.evaluation[0]}
                  format={(percent) => `${percent / 10}`}
                  width={60}
                />
              </Tooltip>
            </Col>
            <Col span={4} style={{ marginRight: "3px", marginLeft: "3px" }}>
              <Tooltip title="Expressive">
                <Progress
                  strokeColor="#FFD700"
                  type="circle"
                  percent={this.props.evaluation[1]}
                  format={(percent) => `${percent / 10}`}
                  width={60}
                />
              </Tooltip>
            </Col>
            <Col span={4} style={{ marginRight: "3px", marginLeft: "3px" }}>
              <Tooltip title="Quality">
                <Progress
                  strokeColor="#1E90FF"
                  type="circle"
                  percent={this.props.evaluation[2]}
                  format={(percent) => `${percent / 10}`}
                  width={60}
                />
              </Tooltip>
            </Col>
            <Col span={4} style={{ marginRight: "3px", marginLeft: "3px" }}>
              <Tooltip title="Popularity">
                <Progress
                  strokeColor="#0000CD"
                  type="circle"
                  percent={this.props.evaluation[3]}
                  format={(percent) => `${percent / 10}`}
                  width={60}
                />
              </Tooltip>
            </Col>
            <Col span={4} style={{ marginRight: "3px", marginLeft: "3px" }}>
              <Tooltip title="Workability">
                <Progress
                  strokeColor="#98FB98"
                  type="circle"
                  percent={this.props.evaluation[4]}
                  format={(percent) => `${percent / 10}`}
                  width={60}
                />
              </Tooltip>
            </Col>
          </Row>
          <Divider style={{ color: "#333", fontWeight: "normal" }}>
            Your Abilities
          </Divider>
        </Col>
      </Row>
    );
  }
}

export default Profile;

// import { Modal, Button } from 'antd';

// class App extends React.Component {
//   state = { visible: false };

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>
//           Open Modal
//         </Button>
//         <Modal
//           title="Basic Modal"
//           visible={this.state.visible}
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//         >
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </Modal>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);

// similarCreater: [],
//     createrInfo: [],
//     visible: false,

//     userInfo: [],
//     artifacts: [],
//     comment: [],
//     _new_comments: [],
//     evaluation: [],
//     _eval_length: 0,
