import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import {
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Carousel,
  Modal,
  Spin,
} from "antd";
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
import { bindActionCreators } from "redux";
import * as artifactAction from "../modules/artifact";
import * as evaluationAction from "../modules/evaluation";
import * as commentAction from "../modules/comment";

const { Title, Paragraph } = Typography;

class ArtifactDetail extends React.Component {
  state = {
    artifactId: null,
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

    this.setState({ artifactId: artifactID });

    const { ArtifactAction, EvaluationAction, CommentAction } = this.props;

    ArtifactAction.getArtifactDetail(artifactID);
    EvaluationAction.getEvaluation(artifactID);
    CommentAction.getComment(artifactID);
  }

  componentDidUpdate(prevProps) {
    const { evaluation } = this.props;
    if (this.props != prevProps) {
      if (evaluation) {
        let avgEval = this.calcAvgEval(this.props.evaluation);
        this.setState({ averageEval: avgEval });
      }
    }
  }

  deleteArtifact = async (id) => {
    const { ArtifactAction } = this.props;
    // var url_link = "http://127.0.0.1:8000/artifacts/api/";

    // await axios.delete(url_link + id);
    ArtifactAction.deleteArtifact(id);
    this.props.history.push("/artifactlist");
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

  preEval = (evaluation) => {
    for (var i in evaluation) {
      if (evaluation[i].userID === parseInt(this.props.userid)) {
        return evaluation[i];
      }
    }
  };

  calcAvgEval = (evaluation) => {
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
      accumulation_eval[i] = Math.floor(accumulation_eval[i] / average_length);
    }
    return accumulation_eval;
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
    const { artifact, evaluation, comment } = this.props;
    return !artifact ? (
      <Spin tip="Loading..."></Spin>
    ) : (
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
              {artifact.image &&
                artifact.image.map((el, index) => (
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
                      mask={false}
                      centered={true}
                      visible={this.state.modalVisible}
                      // mask={false}
                      onCancel={this.closeModal}
                      footer={[
                        <StoreImage
                          key={index}
                          image={this.state.previewImage}
                          userid={this.props.userid}
                          artifactID={artifact.id}
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
                <Title>{artifact.title}</Title>
                <Paragraph>{artifact.description}</Paragraph>
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
          <UserInfo userID={artifact.userID} />
          <SimilarArtist userID={artifact.userID} />
        </Row>
        <Row align="middle" justify="center">
          <EvaluationForm
            preEval={this.preEval(evaluation)}
            artifactID={artifact.id}
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
          {evaluation ? (
            <Evaluation eval={evaluation} />
          ) : (
            <Spin tip="Loading..."></Spin>
          )}
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Comments
        </Divider>
        <Row align="middle" justify="center">
          {comment ? (
            <Comment
              comment={comment}
              artifactID={artifact.id}
              recreationID={this.props.match.params.recreationID}
              userid={this.props.userid}
              category={this.props.category}
            />
          ) : (
            <Spin tip="Loading..."></Spin>
          )}
        </Row>
        <Row>
          <Report
            artifactID={artifact.id}
            userid={this.props.userid}
            isReported={this.state.isReported}
            onChange={(e) => this.handleReportBtn(e)}
          />
          <div className="modifyButton">
            {this.modifyButton(artifact.id, artifact.userID)}
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
                artifactID={artifact.id}
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
    userid: state.auth.userid,
    artifact: state.artifact.data,
    evaluation: state.evaluation.data,
    comment: state.comment.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ArtifactAction: bindActionCreators(artifactAction, dispatch),
    EvaluationAction: bindActionCreators(evaluationAction, dispatch),
    CommentAction: bindActionCreators(commentAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtifactDetail);
