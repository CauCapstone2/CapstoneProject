import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const FileDownload = require("react-file-download");

class StoreImage extends Component {
  creditUpdate = () => {
    let form_data = new FormData();
    form_data.append("user", this.props.userid);
    form_data.append("increase_credit", -2);
    axios.post("http://127.0.0.1:8000/credit/create/", form_data);
  };

  storeDownloadedPicture = () => {
    let form_data = new FormData();
    form_data.append("userID", this.props.userid);
    form_data.append("imageID", this.props.imageID);
    // axios.post("http://127.0.0.1:8000/purchase_c")
  }

  handledownload = () => {
    axios
      .get(this.props.image, {
        responseType: "blob",
      })
      .then((response) => {
        const fileType = response.headers["content-type"].split("/")[1];
        FileDownload(response.data, "IIF_image." + fileType);
      });
    this.creditUpdate();
  };

  render() {
    return (
      <a
        href={this.props.image}
        target="_blank"
        rel="noopener noreferrer"
        download
        onClick={this.handledownload}
      >
        <Button className="download" type="primary" icon={<DownloadOutlined />}>
          download
        </Button>
      </a>
    );
  }
}

export default StoreImage;
