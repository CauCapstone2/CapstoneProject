import React, { Component } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const FileDownload = require("react-file-download");
// const errorMessage = () => {
//   message.error('Require more credit to proceed download');
// };

class StoreImage extends Component {
  state = {
    creditAble: false,
  };

  loginCheck = () => {
    if (this.props.userid === null) {
      message.error("please login first");
    }
  };

  creditUpdate = () => {
    let form_data = new FormData();
    form_data.append("user", this.props.userid);
    form_data.append("increase_credit", -2);
    axios.post("http://127.0.0.1:8000/credit/create/", form_data);
  };

  creditCheck = async () => {
    await axios
      .get("http://127.0.0.1:8000/credit/?user=" + this.props.userid)
      .then((res) => {
        if (res.data[0].credit < 2) {
          message.error("Require more credit to proceed download");
        } else {
          this.creditUpdate();
          this.storeDownloadedPicture();
          this.handledownload();
        }
      });
  };

  storeDownloadedPicture = async () => {
    let form_data = new FormData();
    form_data.append("userID", this.props.userid);
    form_data.append("imageID", this.props.imageid);
    await axios.post("http://127.0.0.1:8000/purchase_check/", form_data);
  };

  purchaseCheck = async () => {
    await axios
      .get(
        "http://127.0.0.1:8000/purchase_check/?userID=" +
          this.props.userid +
          "&imageID=" +
          this.props.imageid
      )
      .then((res) => {
        if (res.data.length !== 0) {
          if (
            res.data[0].imageID == this.props.imageid &&
            res.data[0].userID == this.props.userid
          ) {
            this.handledownload();
          } else {
            this.creditCheck();
          }
        } else {
          this.creditCheck();
        }
      });
  };

  handledownload = () => {
    axios
      .get(
        "http://127.0.0.1:8000/artifacts/api/download/?imageId=" +
          this.props.imageid,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const fileType = response.headers["content-type"].split("/")[1];
        FileDownload(response.data, "IIF_image." + fileType);
      });
  };

  render() {
    return (
      <a
        // href={this.props.image}
        target="_blank"
        rel="noopener noreferrer"
        download
        onClick={this.purchaseCheck}
      >
        <Button className="download" type="primary" icon={<DownloadOutlined />}>
          download
        </Button>
      </a>
    );
  }
}

export default StoreImage;
