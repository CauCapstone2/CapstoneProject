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
    if (this.props.userid === null) {
      Modal.error({
        title: "Please Log in",
      });
      return;
    }

    let payload = {
      userID: this.props.userid,
      Creative: this.state.creative,
      Expressive: this.state.expressive,
      Quality: this.state.quality,
      Popularity: this.state.popularity,
      Workability: this.state.workability,
      artifactID: this.props.artifactID,
    };
    await axios.post("http://127.0.0.1:8000/evaluation/api/", payload);
    this.props.updateEvaluation(this.props.artifactID);
  };

  handleUpdateEval = async () => {
    await axios.patch(
      "http://127.0.0.1:8000/evaluation/api/" + this.props.preEval.id + "/",
      {
        Creative: this.state.creative,
        Expressive: this.state.expressive,
        Quality: this.state.quality,
        Popularity: this.state.popularity,
        Workability: this.state.workability,
      }
    );

    this.props.updateEvaluation(this.props.artifactID);
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
        <span style={{ marginLeft: "10px" }}>
          Creative :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeCreative} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Expressive :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeExpressive} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Quality :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeQuality} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Popularity :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangePopularity} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Workability :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeWorkability} />
        </span>
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
        <span style={{ marginLeft: "10px" }}>
          Creative :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeCreative} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Expressive :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeExpressive} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Quality :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeQuality} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Popularity :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangePopularity} />
        </span>
        <span style={{ marginLeft: "10px" }}>
          Workability :{" "}
          <InputNumber min={0} max={10} onChange={this.onChangeWorkability} />
        </span>
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
