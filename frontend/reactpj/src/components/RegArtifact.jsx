import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Upload, Row, Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class RegArtifact extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
    console.log(this.state);
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = async (event, requestType, artifactID) => {
    await this.handleFormSubmit(event, requestType, artifactID);
    this.props.history.push("/artifactlist");
  };

  handleFormSubmit = (event, requestType, artifactID) => {
    let form_data = new FormData();
    let image_list = [];
    this.state.fileList.forEach((el) => image_list.push(el.originFileObj));
    form_data.append("userID", 2);
    form_data.append("title", event.target.elements.title.value);
    form_data.append("description", event.target.elements.description.value);
    this.state.fileList.forEach((el) =>
      form_data.append("images", el.originFileObj, el.originFileObj.name)
    );

    return axios.post(
      "http://127.0.0.1:8000/artifacts/api/create/",
      form_data,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
            {/* <Form layout="vertical" align="middle"> */}
            {/* <Form.Item name="upload" getValueFromEvent={this.handleUpload}> */}
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {/* </Form.Item> */}
            {/* </Form> */}
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

// export default RegArtifact;
export default withRouter(RegArtifact);
