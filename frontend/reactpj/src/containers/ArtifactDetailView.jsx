import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Image } from "react-bootstrap";
import { Row, Col, Typography, List, Avatar, Divider } from "antd";
import "./ArtifactDetail.css";
import EvaluationForm from "../components/EvaluationForm";
import Evaluation from "../components/Evaluation";
import Comment from "../components/Comment";
import Report from "../components/Report";

const { Title, Paragraph, Text } = Typography;

class ArtifactDetail extends React.Component {
  state = {
    artifact: [],
    comment: [],
    eval: [],
    isReported: false,
  };

  componentDidMount() {
    console.log("mount call");
    console.log(this.props);
    const artifactID = this.props.match.params.artifactID;
    axios
      .get("http://127.0.0.1:8000/artifacts/api/detail/" + artifactID)
      .then((res) => {
        this.setState({
          artifact: res.data,
        });
        console.log(this.state.artifact);
      });
    this.updateEvaluation(artifactID);
    this.updateComment(artifactID);
  }

  handleDelete = async (event) => {
    const artifactID = this.props.match.params.artifactID;
    axios.delete("http://127.0.0.1:8000/artifacts/api/" + artifactID);
    await this.props.history.push("/");
    this.forceUpdate();
    window.location.reload();
  };

  updateComment = (artifactID) => {
    axios
      .get("http://127.0.0.1:8000/comments/api/?artifactID=" + artifactID)
      .then((res) => {
        this.editDate(res.data);
        this.setState({
          comment: res.data.reverse(),
        });
      });
  };

  updateEvaluation = (artifactID) => {
    axios
      .get("http://127.0.0.1:8000/evaluation/api/?artifactID=" + artifactID)
      .then((res) => {
        this.setState({
          eval: res.data,
        });
      });
  };

  preEval = () => {
    for (var i in this.state.eval) {
      if (this.state.eval[i].userID == this.props.userid) {
        return this.state.eval[i];
      }
    }
  };

  editDate = (data) => {
    for (var i in data) {
      data[i].date = data[i].date.split(".")[0];
      data[i].date = data[i].date.replace("T", " ");
      data[i].date = data[i].date.replace("Z", " ");
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col style={{ margin: "10px", minWidth: "40vh" }}>
            <Image
              className="art"
              width="700"
              src={this.state.artifact.image}
            />
          </Col>
          <Col align="middle" justify="center" style={{ maxWidth: "50vh" }}>
            <Row style={{ minHeight: "50%" }}>
              <Title>{this.state.artifact.title}</Title>
            </Row>
            <Row style={{ minHeight: "50%" }}>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.state.artifact.description}
              </Paragraph>
            </Row>
          </Col>
        </Row>
        {/* <Row>
                    <List itemLayout="vertical" size="large" dataSource={this.state.comment} footer={<div><b>Iudicium In Foro</b>comment footer part</div>}
                        pagination={{ onChange: page => { console.log(page); }, pageSize: 10, }}
                        renderItem={item => (
                            <List.Item key={item.artifactID.id}
                                style={{ marginBottom: '10px' }}>
                                <List.Item.Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.username}
                                    description={item.date}
                                    style={{ minWidth: '50vh', maxWidth: '50vh' }}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </Row> */}
        <Row>
          <EvaluationForm
            updateEvaluation={this.updateEvaluation}
            preEval={this.preEval()}
            artifactID={this.props.match.params.artifactID}
            userid={this.props.userid}
          />
          <Evaluation eval={this.state.eval} />
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Comments
        </Divider>
        <Row>
          <Comment
            updateComment={this.updateComment}
            comment={this.state.comment}
            artifactID={this.props.match.params.artifactID}
            userid={this.props.userid}
          />
        </Row>
        <Row>
          <Report
            artifactID={this.props.match.params.artifactID}
            userid={this.props.userid}
            isReported={this.state.isReported}
          />
        </Row>
      </div>
      // <div>
      //     <div className="intro">
      //         Iuducium In Foro
      //     </div>
      //     <div className="art-intro">
      //         Content
      //     </div>

      //     <Container>
      //         <div className="art-box">
      //             <Image className="art" width="700" src={this.state.artifact.image} />
      //         </div>
      //         <div className="description">
      //             <h2> {this.state.artifact.title} </h2>
      //             <h5> Mr. Park </h5>
      //             <p> {this.state.artifact.description} </p>
      //         </div>
      //         <Evaluation eval={this.state.eval} />
      //         <EvaluationForm updateEvaluation={this.updateEvaluation} preEval={this.preEval()} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />

      //         <Comment updateComment={this.updateComment} comment={this.state.comment} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />
      //         <Report artifactID={this.props.match.params.artifactID} userid={this.props.userid} isReported={this.state.isReported} />
      //     </Container>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(ArtifactDetail);
