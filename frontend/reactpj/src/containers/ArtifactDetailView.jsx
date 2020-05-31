import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import { Button, Row, Col, Typography, Divider, Carousel, Modal } from "antd";
import "./ArtifactDetail.css";
import EvaluationForm from "../components/EvaluationForm";
import Evaluation from "../components/Evaluation";
import Comment from "../components/Comment";
import Report from "../components/Report";
import PredictPicture from "../components/PredictPicture";
import Recreation from "../containers/Recreation";
import SimilarImage from "../components/SimilarImage";

const { Title, Paragraph } = Typography;

class ArtifactDetail extends React.Component {
  state = {
    artifact: [],
    comment: [],
    eval: [],
    isReported: false,
    modalVisible: false,
    similarImageVisible: false,
    similarImageList: [],
    previewImage: "",
    predict: -1,
    averageEval: [],
  };

  componentDidMount() {
    const artifactID = this.props.match.params.artifactID;
    axios
      .get("http://127.0.0.1:8000/artifacts/api/detail/" + artifactID)
      .then((res) => {
        this.setState({
          artifact: res.data,
        });
      });
    this.updateEvaluation(artifactID);
    this.updateComment(artifactID);
  }

  deleteArtifact = async (id) => {
    await axios.delete("http://127.0.0.1:8000/artifacts/api/" + id);
    this.props.history.push("/artifactlist");
    this.forceUpdate();
    window.location.reload();
  };

  modifyButton = (id, userID) => {
    return parseInt(this.props.userid) === userID ? (
      <div>
        <Button type="link" onClick={() => this.deleteArtifact(id)}>
          delete
        </Button>
      </div>
    ) : null;
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
      if (this.state.eval[i].userID === parseInt(this.props.userid)) {
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

  preEval = () => {
    for (var i in this.state.eval) {
      if (this.state.eval[i].userID == this.props.userid) {
        return this.state.eval[i];
      }
    }
  };

  showModal = (imageId, image, predict, e) => {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      previewImage: image,
      predict: predict,
      previewImageId: imageId,
    });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, similarImageVisible: false });
  };

  showSimilarImage(imageId, e) {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:8000/similar-image/?imageId=" + imageId)
      .then((res) => {
        this.setState({
          similarImageList: res.data,
          similarImageVisible: !this.state.similarImageVisible,
        });
      });
  }

  render() {
    return (
      <div>
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
                  <div className="art-box" key={index}>
                    <Image
                      className="art"
                      style={{ width: "100%", height: "100%" }}
                      src={el.image}
                      onClick={(e) =>
                        this.showModal(el.id, el.image, el.predict, e)
                      }
                    ></Image>
                    <Modal
                      visible={this.state.modalVisible}
                      mask={false}
                      onCancel={this.closeModal}
                      footer={[
                        <Button
                          key="ok"
                          onClick={this.closeModal}
                          type="primary"
                        >
                          OK
                        </Button>,
                      ]}
                    >
                      <PredictPicture
                        previewImage={this.state.previewImage}
                        predict={this.state.predict}
                      />
                      <h3
                        onClick={(e) =>
                          this.showSimilarImage(this.state.previewImageId, e)
                        }
                      >
                        Similar art
                      </h3>
                      {this.state.similarImageVisible ? (
                        <SimilarImage imageList={this.state.similarImageList} />
                      ) : null}
                    </Modal>
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
            userid={this.props.userid}
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
          <div className="modifyButton">
            {this.modifyButton(
              this.state.artifact.id,
              this.state.artifact.userID
            )}
          </div>
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Recreation
        </Divider>
        <Row align="middle" justify="center">
          <Recreation
            artifactID={this.props.match.params.artifactID}
            requestType={this.props.requestType}
          />
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

export default connect(mapStateToProps)(ArtifactDetail);
