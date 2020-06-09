import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { List, Row, Col, Avatar, Comment, Divider, Spin, Alert } from "antd";
import "./ArtifactDetail.css";
import Artifact from "../components/Artifact";
import Profile from "../components/profile";

class Mypage extends React.Component {
  state = {
    userInfo: [],
    artifact: [],
    comment: [],
    _new_comments: [],
    evaluation: [],
    _eval_length: 0,
  };

  componentDidMount() {
    this.userInformationCall(this.props.userid);
    this.userArtifactCall(this.props.userid);
    this.userCommentCall(this.props.userid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userid !== prevProps.userid) {
      this.userInformationCall(this.props.userid);
      this.userArtifactCall(this.props.userid);
      this.userCommentCall(this.props.userid);
    }
  }

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
          artifact: res.data,
        });
        this.userEvaluationCall(userID);
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

  userEvaluationCall = (userId) => {
    axios
      .get("http://127.0.0.1:8000/evaluation/api/average?userId=" + userId)
      .then((res) => {
        this.setState({
          evaluation: res.data.average,
          _eval_length: res.data.length,
        });
      });
  };

  recreationErase = () => {
    let _comments = this.state.comment;
    let _new_comments = [];
    for (let i in _comments) {
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
  render() {
    const {
      userInfo,
      artifact,
      _new_comments,
      evaluation,
      _eval_length,
    } = this.state;
    return (
      <div onContextMenu={(e) => e.preventDefault()}>
        {!this.props.isAuthenticated ? (
          <Spin tip="Loading...">
            <Alert
              message="Mypage Loading Error"
              description="You need to login first"
              type="error"
            />
          </Spin>
        ) : (
          <div>
            <Profile
              artifact={artifact}
              _new_comments={_new_comments}
              _eval_length={_eval_length}
              userInfo={userInfo}
              evaluation={evaluation}
            />
            <Divider
              orientation="left"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Uploaded Artifacts
            </Divider>
            <Row
              align="middle"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              <Row
                align="middle"
                justify="center"
                gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}
              >
                {artifact.map((artifact, index) => (
                  <Col key={index}>
                    <NavLink
                      to={{ pathname: `/artifacts/${artifact.id}` }}
                      style={{ color: "black" }}
                    >
                      <Artifact key={artifact.id} data={artifact} />
                    </NavLink>
                  </Col>
                ))}
              </Row>
            </Row>
            <Divider
              orientation="left"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Written Comments
            </Divider>
            <Row
              justify="center"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <List
                itemLayout="vertical"
                size="large"
                dataSource={_new_comments}
                footer={
                  <div>
                    <b>Iudicium In Foro</b>comment footer part
                  </div>
                }
                pagination={{
                  onChange: (page) => {},
                  pageSize: 5,
                }}
                renderItem={(item) => (
                  <List.Item
                    key={item.artifactID.id}
                    extra={
                      <img
                        width={250}
                        height={180}
                        alt="logo"
                        src={item.artifactID.image}
                      />
                    }
                    style={{ marginBottom: "10px" }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <a
                          href={
                            "http://localhost:3000/artifacts/" +
                            item.artifactID.id
                          }
                        >
                          {item.artifactID.title}
                        </a>
                      }
                      description={item.artifactID.username}
                      style={{ minWidth: "50vh", maxWidth: "50vh" }}
                    />
                    {item.artifactID.description}
                    <br />
                    <Comment
                      author={<div>{item.username}</div>}
                      content={item.content}
                      datetime={item.date}
                    />
                  </List.Item>
                )}
              />
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userid,
    isAuthenticated: state.auth.token,
  };
};

export default connect(mapStateToProps)(Mypage);
