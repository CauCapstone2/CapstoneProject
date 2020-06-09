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
import StoreImage from "../components/StoreImage";
import SimilarImage from "../components/SimilarImage";
import UserInfo from "../components/UserInfo";
import SimilarArtist from "../components/SimilarArtist";

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
    similarImageLoading: true,
    previewImage: "",
    predict: -1,
    averageEval: [],
  };

  componentDidMount() {
    var artifactID = null;
    if (this.props.category == "recreation")
      artifactID = this.props.match.params.recreationID;
    else artifactID = this.props.match.params.artifactID;

    var url_link = "";
    if (this.props.category == "recreation")
      url_link = "http://127.0.0.1:8000/recreate/detail/";
    else url_link = "http://127.0.0.1:8000/artifacts/api/detail/";

    axios.get(url_link + artifactID).then((res) => {
      this.setState({
        artifact: res.data,
      });
    });
    this.updateEvaluation(artifactID);
    this.updateComment(artifactID);
  }

  deleteArtifact = async (id) => {
    var url_link = "";
    if (this.props.category == "recreation")
      url_link = "http://127.0.0.1:8000/recreate/";
    else url_link = "http://127.0.0.1:8000/artifacts/api/";

    await axios.delete(url_link + id);
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
    var url_link = "";
    if (this.props.category == "recreation")
      url_link = "http://127.0.0.1:8000/comments/api/?recreationID=";
    else url_link = "http://127.0.0.1:8000/comments/api/?artifactID=";

    axios.get(url_link + artifactID).then((res) => {
      this.editDate(res.data);
      this.setState({
        comment: res.data.reverse(),
      });
    });
  };

  updateEvaluation = (artifactID) => {
    var url_link = "";
    if (this.props.category == "recreation")
      url_link = "http://127.0.0.1:8000/evaluation/api/?recreationID=";
    else url_link = "http://127.0.0.1:8000/evaluation/api/?artifactID=";

    axios.get(url_link + artifactID).then((res) => {
      this.setState({
        eval: res.data,
      });
      this.averageEvaluation();
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

  averageEvaluation = () => {
    const evaluation = this.state.eval;
    let accumulation_eval = [0, 0, 0, 0, 0];
    let average_length = 0;
    for (let i in evaluation) {
      average_length++;
      accumulation_eval[0] += evaluation[i].Creative;
      accumulation_eval[1] += evaluation[i].Expressive;
      accumulation_eval[2] += evaluation[i].Quality;
      accumulation_eval[3] += evaluation[i].Popularity;
      accumulation_eval[4] += evaluation[i].Workability;
    }
    for (let i in accumulation_eval) {
      accumulation_eval[i] = accumulation_eval[i] / average_length;
    }
    this.setState({
      averageEval: accumulation_eval,
    });
  };

  preEval = () => {
    for (let i in this.state.eval) {
      if (this.state.eval[i].userID === parseInt(this.props.userid)) {
        return this.state.eval[i];
      }
    }
  };

  showModal = (imageId, image, predict, e) => {
    e.preventDefault();
    console.log(imageId);
    console.log(image);
    console.log(predict);
    console.log(e);
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
    this.setState({ similarImageVisible: !this.state.similarImageVisible });

    axios
      .get("http://127.0.0.1:8000/similar-image/?imageId=" + imageId)
      .then((res) => {
        res.data.splice(8);
        this.setState({
          similarImageList: res.data,
          similarImageLoading: false,
        });
      });
  }

  moveSimilarImage(artifactId) {
    this.setState({ modalVisible: false, referrer: artifactId });
    //need to be modified about recreationID & artifactID
    this.props.history.push(`/artifacts/${artifactId}`);
    window.location.reload();
  }

  handleReportBtn(val) {
    this.setState({ isReported: val });
  }

  render() {
    return (
      <div onContextMenu={(e) => e.preventDefault()}>
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
                      width="70vh"
                      centered={true}
                      visible={this.state.modalVisible}
                      // mask={false}
                      onCancel={this.closeModal}
                      footer={[
                        <StoreImage
                          key={index}
                          image={this.state.previewImage}
                          userid={this.props.userid}
                          artifactID={
                            this.props.match.params.artifactID
                              ? this.props.match.params.artifactID
                              : this.props.match.params.recreationID
                          }
                        />,
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
                      <Button
                        type="primary"
                        onClick={(e) => {
                          this.showSimilarImage(this.state.previewImageId, e);
                        }}
                      >
                        Show Similar Arts
                      </Button>
                      {this.state.similarImageVisible ? (
                        <SimilarImage
                          onChange={(e) => this.moveSimilarImage(e)}
                          isLoading={this.state.similarImageLoading}
                          imageList={this.state.similarImageList}
                        />
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
              flexDirection: "column",
              alignItems: "center",
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
            <Row
              align="middle"
              justify="center"
              style={{ backgroundColor: "" }}
            >
              <Evaluation eval={this.state.averageEval} chart={true} />
            </Row>
          </Col>
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Artist Infomation
        </Divider>
        <Row align="middle" justify="center">
          <UserInfo userID={this.state.artifact.userID} />
          <SimilarArtist userID={this.state.artifact.userID} />
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
            onChange={(e) => this.handleReportBtn(e)}
          />
          <div className="modifyButton">
            {this.modifyButton(
              this.state.artifact.id,
              this.state.artifact.userID
            )}
          </div>
        </Row>
        {this.props.category == "recreation" ? null : (
          <div>
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
        )}
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
