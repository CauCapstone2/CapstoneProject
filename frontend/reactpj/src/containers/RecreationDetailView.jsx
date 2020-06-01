import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import { Button, Row, Col, Typography, Divider, Carousel } from "antd";
import "./RecreationDetail.css";
import EvaluationForm from "../components/EvaluationForm";
import Evaluation from "../components/Evaluation";
import Comment from "../components/Comment";
import Report from "../components/Report";

const { Title, Paragraph } = Typography;

class RecreationDetail extends React.Component {
  state = {
    artifact: [],
    comment: [],
    eval: [],
    isReported: false,
  };

  componentDidMount() {
    const recreationID = this.props.match.params.recreationID;
    axios
      .get("http://127.0.0.1:8000/recreate/detail/" + recreationID)
      .then((res) => {
        this.setState({
          artifact: res.data,
        });
      });
    this.updateEvaluation(recreationID);
    this.updateComment(recreationID);
  }

  deleteArtifact = async (id) => {
    await axios.delete("http://127.0.0.1:8000/recreate/" + id);
    this.props.history.push("/artifactlist/");
    this.forceUpdate();
    window.location.reload();
  };

  modifyButton = (id, userID) => {
    return this.props.userid == userID ? (
      <div>
        <Button type="link" onClick={() => this.deleteArtifact(id)}>
          delete
        </Button>
      </div>
    ) : null;
  };

  updateComment = (recreationID) => {
    axios
      .get("http://127.0.0.1:8000/comments/api/?recreationID=" + recreationID)
      .then((res) => {
        this.editDate(res.data);
        this.setState({
          comment: res.data.reverse(),
        });
      });
  };

  updateEvaluation = (recreationID) => {
    axios
      .get("http://127.0.0.1:8000/evaluation/api/?recreationID=" + recreationID)
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
      <div onContextMenu={(e)=> e.preventDefault()}>
        <Row align="middle" justify="center">
          <Col
            span={12}
            style={{
              margin: "10px",
              maxWidth: "50vh",
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          >
            <Carousel
              autoplay
              style={{
                backgroundColor: "#010101",
                display: "flex",
                alignContent: "center",
              }}
            >
              {this.state.artifact.image &&
                this.state.artifact.image.map((el, index) => (
                  <div className="art-box">
                    <Image
                      className="art"
                      style={{ width: "100%", height: "100%" }}
                      src={el.image}
                    ></Image>
                  </div>
                ))}
            </Carousel>
          </Col>
          <Col
            span={12}
            align="middle"
            justify="center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "50vh",
              backgroundColor: "",
            }}
          >
            <Row
              align="middle"
              justify="center"
              style={{ backgroundColor: "" }}
            >
              <Typography>
                <Title>{this.state.artifact.title}</Title>
                <Paragraph>{this.state.artifact.description}</Paragraph>
              </Typography>
            </Row>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <EvaluationForm
            updateEvaluation={this.updateEvaluation}
            preEval={this.preEval()}
            artifactID={this.props.match.params.artifactID}
            recreationID={this.props.match.params.recreationID}
            userid={this.props.userid}
            category="recreation"
          />
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Evaluations
        </Divider>
        <Row align="middle" justify="center">
          <Evaluation eval={this.state.eval} />
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Comments
        </Divider>
        <Row align="middle" justify="center">
          <Comment
            updateComment={this.updateComment}
            comment={this.state.comment}
            recreationID={this.props.match.params.recreationID}
            artifactID={this.props.match.params.artifactID}
            userid={this.props.userid}
            category="recreation"
          />
        </Row>
        <Row>
          <Report
            recreationID={this.props.match.params.recreationID}
            userid={this.props.userid}
            isReported={this.state.isReported}
            category="recreation"
          />
          <div className="modifyButton">
            {this.modifyButton(
              this.state.artifact.id,
              this.state.artifact.userID
            )}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(RecreationDetail);
