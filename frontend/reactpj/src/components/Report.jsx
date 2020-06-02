import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";

class Report extends Component {
  state = {
    isReported: false,
  };
  
  componentDidMount() {
    this.updateReport();
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
              this.state.isReported = true;
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
              this.state.isReported = true;
            }
          }
          if (res.data.length > 100) {
            axios.delete("http://127.0.0.1:8000/api" + this.props.artifactID);
          }
        });
    }
  };

  submitReport = () => {
    if (this.props.category === "recreation") {
      axios.post("http://127.0.0.1:8000/report/api/", {
        userID: this.props.userid,
        recreationID: this.props.recreationID,
        artifactID: null,
      });
      this.setState({
        isReported: true,
      });
    } else {
      axios.post("http://127.0.0.1:8000/report/api/", {
        userID: this.props.userid,
        artifactID: this.props.artifactID,
        recreationID: null,
      });
      this.setState({
        isReported: true,
      });
    }
  };

  cancelReport = () => {
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
    this.setState({
      isReported: false,
    });
  };

  render() {
    this.updateReport();
    return this.state.isReported ? (
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
