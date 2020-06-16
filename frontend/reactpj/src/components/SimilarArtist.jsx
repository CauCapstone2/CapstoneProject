import React from "react";
import axios from "axios";
import Profile from "../components/profile";
import { Row, Col, Avatar, Typography, Divider, Modal } from "antd";

const { Paragraph } = Typography;

class SimilarCreater extends React.Component {
  state = {
    similarCreater: [],
    createrInfo: [],
    visible: false,

    userInfo: [],
    artifact: [],
    comment: [],
    _new_comments: [],
    evaluation: [],
    _eval_length: 0,
  };

  componentDidMount() {
    this.similarCreaterCall(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.similarCreaterCall(this.props.userID);
    }
  }

  similarCreaterCall = async (userID) => {
    await axios
      .get("http://3.34.190.67/similar-artist/?userID=" + userID)
      .then((res) => {
        this.setState({
          similarCreater: res.data.result,
        });
        this.similarCreaterInformationCall(res.data.result);
      });
  };

  similarCreaterInformationCall = async (data) => {
    let _createrInfo = [];
    for (let i in data) {
      await axios
        .get("http://3.34.190.67/mypage/user/?id=" + data[i])
        .then((res) => {
          _createrInfo[i] = res.data[0];
        });
    }
    this.setState({
      createrInfo: _createrInfo,
    });
  };

  userInformationCall = (userID) => {
    axios.get("http://3.34.190.67/mypage/user/?id=" + userID).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  };

  userArtifactCall = (userID) => {
    axios
      .get("http://3.34.190.67/artifacts/api/?userID=" + userID)
      .then((res) => {
        this.setState({
          artifact: res.data.results,
        });
        this.userEvaluationCall(userID);
      });
  };

  userCommentCall = (userID) => {
    axios
      .get("http://3.34.190.67/mypage/comments/?userID=" + userID)
      .then((res) => {
        this.setState({
          comment: res.data,
        });
        this.recreationErase();
      });
  };

  userEvaluationCall = (userId) => {
    axios
      .get("http://3.34.190.67/evaluation/api/average?userId=" + userId)
      .then((res) => {
        this.setState({
          evaluation: res.data.average,
          _eval_length: res.data.length,
        });
      });
  };

  recreationErase = () => {
    var _comments = this.state.comment;
    var _new_comments = [];
    for (var i in _comments) {
      if (_comments[i].artifactID === null) {
        continue;
      }
      _new_comments.push(_comments[i]);
    }
    this.editDate(_new_comments);
    this.setState({
      _new_comments: _new_comments,
    });
  };

  editDate = (data) => {
    for (var i in data) {
      data[i].date = data[i].date.split(".")[0];
      data[i].date = data[i].date.replace("T", " ");
      data[i].date = data[i].date.replace("Z", " ");
    }
  };

  showModal = (data) => {
    this.userInformationCall(data.id);
    this.userArtifactCall(data.id);
    this.userCommentCall(data.id);
    this.setState({
      visible: true,
    });
  };

  handleOK = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      createrInfo,
      userInfo,
      artifact,
      _new_comments,
      evaluation,
      _eval_length,
    } = this.state;
    return (
      <div>
        <Row justify="center" align="middle">
          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Similar Creators
          </Divider>
          {createrInfo.map((createrInfo, index) => (
            <Col
              key={index}
              justify="center"
              align="middle"
              onClick={(e) => this.showModal(createrInfo)}
            >
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
                <Paragraph>{createrInfo.username}</Paragraph>
              </Typography>
            </Col>
          ))}
        </Row>
        <Modal
          // centered={true}
          visible={this.state.visible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
          footer={null}
          width="100%"
        >
          <Profile
            artifact={artifact}
            _new_comments={_new_comments}
            _eval_length={_eval_length}
            userInfo={userInfo}
            evaluation={evaluation}
          />
        </Modal>
      </div>
    );
  }
}

export default SimilarCreater;
