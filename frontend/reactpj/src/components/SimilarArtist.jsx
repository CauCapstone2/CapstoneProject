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

  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.similarCreaterCall(this.props.userID);
    }
  }

  similarCreaterCall = async (userID) => {
    await axios
      .get("http://127.0.0.1:8000/similar-artist/?userID=" + userID)
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
        .get("http://127.0.0.1:8000/mypage/user/?id=" + data[i])
        .then((res) => {
          _createrInfo[i] = res.data[0];
        });
    }
    this.setState({
      createrInfo: _createrInfo,
    });
  };

  userInformationCall = (userID) => {
    axios.get("http://127.0.0.1:8000/mypage/user/?id=" + userID).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  };

  userArtifactCall = (userID) => {
    axios
      .get("http://127.0.0.1:8000/artifacts/api/?userID=" + userID)
      .then((res) => {
        this.setState({
          artifact: res.data.results,
        });
        console.log(res.data.result);
        this.userEvaluationCall(res.data.results);
      });
  };

  userCommentCall = (userID) => {
    axios
      .get("http://127.0.0.1:8000/mypage/comments/?userID=" + userID)
      .then((res) => {
        this.setState({
          comment: res.data,
        });
        this.recreationErase();
      });
  };

  userEvaluationCall = async (data) => {
    let _evaluation = [0, 0, 0, 0, 0];
    let _eval_num = 0;

    for (let i in data) {
      await axios
        .get("http://127.0.0.1:8000/evaluation/api/?artifactID=" + data[i].id)
        .then((res) => {
          if (res.data[0]) {
            _eval_num++;
            _evaluation[0] += res.data[0].Creative;
            _evaluation[1] += res.data[0].Expressive;
            _evaluation[2] += res.data[0].Quality;
            _evaluation[3] += res.data[0].Popularity;
            _evaluation[4] += res.data[0].Workability;
          }
        });
    }

    for (let i in _evaluation) {
      _evaluation[i] = Math.floor((_evaluation[i] * 10) / _eval_num);
    }
    this.setState({
      evaluation: _evaluation,
      _eval_length: _eval_num,
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
          centered={true}
          visible={this.state.visible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
          footer={null}
          width="95vh"
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