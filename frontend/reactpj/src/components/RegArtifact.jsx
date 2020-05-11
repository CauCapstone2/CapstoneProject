import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

class RegArtifact extends React.Component {
  state = {
    image: "",
  };

  handleSubmit = async (event, requestType, artifactID) => {
    await this.handleFormSubmit(event, requestType, artifactID);
    window.location.reload();
  };

  handleFormSubmit = (event, requestType, artifactID) => {
    let form_data = new FormData();
    form_data.append("userID", this.props.userid);
    form_data.append("title", event.target.elements.title.value);
    form_data.append(
      "image",
      this.state.image.originFileObj,
      this.state.image.originFileObj.name
    );
    form_data.append("description", event.target.elements.description.value);
    // console.log(artifactID);
    return axios
      .post("http://127.0.0.1:8000/api/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  handleUpload = (e) => {
    this.setState({
      image: e.file,
    });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        onSubmitCapture={(event) =>
          this.handleSubmit(
            event,
            this.props.requestType,
            this.props.artifactID
          )
        }
      >
        <Row
          align="middle"
          gutter={[16]}
          style={{ position: "relative", top: "25vh" }}
        >
          <Col span={12} gutter={[16, 16]}>
            <Form layout="vertical" align="middle">
              <Form.Item name="upload" getValueFromEvent={this.handleUpload}>
                <Upload name="image" listType="picture">
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} gutter={[16]}>
            <Form
              layout="vertical"
              style={{
                marginRight: "20px",
                marginLeft: "10px",
                marginTop: "20px",
              }}
            >
              <Form.Item label="Title">
                <Input.TextArea
                  name="title"
                  placeholder="Enter a title for your art"
                  style={{ marginRight: "10px" }}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea
                  name="description"
                  placeholder="Enter description"
                  style={{ marginRight: "10px" }}
                  autoSize={{ minRows: 5, maxRows: 30 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ marginRight: "10px" }}
                  type="primary"
                  htmlType="submit"
                >
                  {this.props.btnText}
                </Button>
                <NavLink to={{ pathname: `/` }}>
                  <Button style={{ marginRight: "10px", marginLeft: "10px" }}>
                    Cancel
                  </Button>
                </NavLink>
              </Form.Item>
            </Form>
          </Col>
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

export default connect(mapStateToProps, null)(RegArtifact);