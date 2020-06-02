import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "antd";

class Report extends Component {
  handleChange(val) {
    console.log("report handle start");
    this.props.onChange(val);
    console.log(`report handle end:`);
  }

  componentDidMount() {
    this.updateReport();
    console.log("didmount");
  }

  updateReport = () => {
    if (this.props.category === "recreation") {
      axios
        .get(
          "http://127.0.0.1:8000/report/api/?recreationID=" +
            this.props.recreationID
        )
        .then((res) => {
          for (var i in res.data) {
            console.log(this.props.userid);
            console.log(typeof this.props.userid);
            console.log(this.props.res.data[i].userID);
            console.log(typeof res.data[i].userID);

            if (this.props.userid == res.data[i].userID) {
              this.handleChange(true);
            }
          }
          if (res.data.length > 100) {
            axios.delete("http://127.0.0.1:8000/api" + this.props.recreationID);
          }
        });
    } else {
      axios
        .get(
          "http://127.0.0.1:8000/report/api/?artifactID=" +
            this.props.artifactID
        )
        .then((res) => {
          for (var i in res.data) {
            if (this.props.userid == res.data[i].userID) {
              this.handleChange(true);
            }
          }
          if (res.data.length > 100) {
            axios.delete("http://127.0.0.1:8000/api" + this.props.artifactID);
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
      axios.post("http://127.0.0.1:8000/report/api/", {
        userID: this.props.userid,
        recreationID: this.props.recreationID,
        artifactID: null,
      });
      this.handleChange(true);
    } else {
      axios.post("http://127.0.0.1:8000/report/api/", {
        userID: this.props.userid,
        artifactID: this.props.artifactID,
        recreationID: null,
      });
      this.handleChange(true);
    }
  };

  cancelReport = () => {
    console.log("cancel");
    if (this.props.category == "recreation") {
      axios.delete(
        "http://127.0.0.1:8000/report/api/" +
          this.props.userid +
          "/?recreationID=" +
          this.props.recreationID
      );
    } else {
      axios.delete(
        "http://127.0.0.1:8000/report/api/" +
          this.props.userid +
          "/?artifactID=" +
          this.props.artifactID
      );
    }
    this.handleChange(false);
  };

  render() {
    console.log("update");
    console.log(this.props.isReported);
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
