import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Upload, Row, Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class RegCreation extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    title: "",
    description: "",
  };

  error = (userid) => {
    if (userid == null)
      Modal.error({
        title: "Please Log in",
      });
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
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = async (event, requestType, artifactID) => {
    await this.handleFormSubmit(event, requestType, artifactID);
    this.props.history.push("/artifacts/" + artifactID);
    this.props.onCancel();
    this.props.itemReload(this.props.artifactID);
    // window.location.reload();
  };

  handleFormSubmit = async (event) => {
    const artifactID = this.props.artifactID;
    let form_data = new FormData();
    let image_list = [];
    this.state.fileList.forEach((el) => image_list.push(el.originFileObj));
    form_data.append("userID", this.props.userid);
    form_data.append("artifactID", artifactID);
    form_data.append("title", event.target.elements.title.value);
    form_data.append("description", event.target.elements.description.value);
    this.state.fileList.forEach((el) =>
      form_data.append("images", el.originFileObj, el.originFileObj.name)
    );
    form_data.append("recreation", true);

    await axios.post("http://127.0.0.1:8000/recreate/", form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
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
      <Modal
        title="Recreation Upload"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        width="80vh"
      >
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          onSubmitCapture={(event) => {
            this.handleSubmit(
              event,
              this.props.requestType,
              this.props.artifactID
            );
          }}
        >
          <Row
            align="middle"
            gutter={[16]}
            style={{ position: "relative", top: "5vh" }}
          >
            <Col span={12} offset={6}>
              <Upload
                listType="picture-card"
                multiple={true}
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 12 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
            <Col span={12} offset={6}>
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
                    style={{ marginRight: "10px", marginBottom: "3vh" }}
                    rows={5}
                    // autoSize={{ minRows: 5, maxRows: 30 }}
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: "5vh" }}>
                  <Button
                    style={{ marginRight: "10px" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.error(this.props.userid)}
                  >
                    Submit
                  </Button>
                  <NavLink to={{ pathname: `/artifactlist` }}>
                    <Button style={{ marginRight: "10px", marginLeft: "10px" }}>
                      Cancel
                    </Button>
                  </NavLink>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default withRouter(connect(mapStateToProps, null)(RegCreation));
