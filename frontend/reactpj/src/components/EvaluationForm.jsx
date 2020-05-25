import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, InputNumber } from "antd";

class EvaluationForm extends Component {
  state = {
    creative: null,
    expressive: null,
    quality: null,
    popularity: null,
    workability: null,
  };

  handleSubmitEval = async () => {
    if (this.props.userid == null) {
      Modal.error({
        title: "Please Log in",
      });
      return;
    }

    if (this.props.category == "recreation") {
      await axios
        .post("http://127.0.0.1:8000/evaluation/api/", {
          userID: this.props.userid,
          Creative: this.state.creative,
          Expressive: this.state.expressive,
          Quality: this.state.quality,
          Popularity: this.state.popularity,
          Workability: this.state.workability,
          recreationID: this.props.recreationID,
          artifactID: null,
        })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
      this.props.updateEvaluation(this.props.recreationID);
    } else {
      await axios
        .post("http://127.0.0.1:8000/evaluation/api/", {
          userID: this.props.userid,
          Creative: this.state.creative,
          Expressive: this.state.expressive,
          Quality: this.state.quality,
          Popularity: this.state.popularity,
          Workability: this.state.workability,
          artifactID: this.props.artifactID,
          recreationID: null,
        })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
      this.props.updateEvaluation(this.props.artifactID);
    }
  };

  handleUpdateEval = async () => {
    await axios
      .patch(
        "http://127.0.0.1:8000/evaluation/api/" + this.props.preEval.id + "/",
        {
          Creative: this.state.creative,
          Expressive: this.state.expressive,
          Quality: this.state.quality,
          Popularity: this.state.popularity,
          Workability: this.state.workability,
        }
      )
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    if (this.props.category == "recreation") {
      this.props.updateEvaluation(this.props.recreationID);
    } else {
      this.props.updateEvaluation(this.props.artifactID);
    }
  };

  onChangeCreative = (value) => {
    this.setState({ creative: value });
  };
  onChangeExpressive = (value) => {
    this.setState({ expressive: value });
  };
  onChangeQuality = (value) => {
    this.setState({ quality: value });
  };
  onChangePopularity = (value) => {
    this.setState({ popularity: value });
  };
  onChangeWorkability = (value) => {
    this.setState({ workability: value });
  };

  render() {
    return this.props.preEval ? (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        className="eval-input"
      >
        <p style={{ marginLeft: "10px" }}>
          Creative :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeCreative} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Expressive :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeExpressive} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Quality :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeQuality} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Popularity :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangePopularity} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Workability :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeWorkability} />
        </p>
        <Button
          type="primary"
          onClick={this.handleUpdateEval}
          style={{ marginLeft: "10px" }}
        >
          Update
        </Button>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        className="eval-input"
      >
        <p style={{ marginLeft: "10px" }}>
          Creative :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeCreative} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Expressive :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeExpressive} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Quality :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeQuality} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Popularity :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangePopularity} />
        </p>
        <p style={{ marginLeft: "10px" }}>
          Workability :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeWorkability} />
        </p>
        <Button
          type="primary"
          onClick={this.handleSubmitEval}
          style={{ marginLeft: "10px" }}
        >
          Evaluate
        </Button>
      </div>
    );
  }
}

export default EvaluationForm;
