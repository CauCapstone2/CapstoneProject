import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "antd";

class Report extends Component {
  handleChange(val) {
    this.props.onChange(val);
  }

  componentDidMount() {
    this.updateReport();
  }

  updateReport = () => {
    if (this.props.category === "recreation") {
      axios
        .get(
          "http://3.34.190.67/report/api/?recreationID=" +
            this.props.recreationID
        )
        .then((res) => {
          for (var i in res.data) {
            if (parseInt(this.props.userid) === res.data[i].userID) {
              this.handleChange(true);
            }
          }
          if (res.data.length > 100) {
            axios.delete("http://3.34.190.67/api" + this.props.recreationID);
          }
        });
    } else {
      axios
        .get(
          "http://3.34.190.67/report/api/?artifactID=" +
            this.props.artifactID
        )
        .then((res) => {
          for (var i in res.data) {
            if (parseInt(this.props.userid) === res.data[i].userID) {
              this.handleChange(true);
            }
          }
          if (res.data.length > 100) {
            axios.delete("http://3.34.190.67/api" + this.props.artifactID);
          }
        });
    }
  };

  submitReport = () => {
    if (this.props.userid === null) {
      Modal.error({
        title: "Please Log in",
      });
      return;
    }

    if (this.props.category === "recreation") {
      axios.post("http://3.34.190.67/report/api/", {
        userID: this.props.userid,
        recreationID: this.props.recreationID,
        artifactID: null,
      });
      this.handleChange(true);
    } else {
      axios.post("http://3.34.190.67/report/api/", {
        userID: this.props.userid,
        artifactID: this.props.artifactID,
        recreationID: null,
      });
      this.handleChange(true);
    }
  };

  cancelReport = () => {
    if (this.props.category === "recreation") {
      axios.delete(
        "http://3.34.190.67/report/api/" +
          this.props.userid +
          "/?recreationID=" +
          this.props.recreationID
      );
    } else {
      axios.delete(
        "http://3.34.190.67/report/api/" +
          this.props.userid +
          "/?artifactID=" +
          this.props.artifactID
      );
    }
    this.handleChange(false);
  };

  render() {
    return this.props.isReported ? (
      <div>
        <Button danger onClick={this.cancelReport}>
          Cancel
        </Button>
      </div>
    ) : (
      <div>
        <Button type="primary" danger onClick={this.submitReport}>
          Report
        </Button>
      </div>
    );
  }
}

export default Report;
