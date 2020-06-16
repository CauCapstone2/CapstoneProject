import React from "react";
import axios from "axios";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  state = {
    image: "",
  };

  handleSubmit = async (event, requestType, artifactID) => {
    await this.handleFormSubmit(event, requestType, artifactID);
    window.location.reload();
  };

  handleFormSubmit = (event, requestType, artifactID) => {
    let form_data = new FormData();
    form_data.append("title", event.target.elements.title.value);
    form_data.append(
      "image",
      this.state.image.originFileObj,
      this.state.image.originFileObj.name
    );
    form_data.append("description", event.target.elements.description.value);
    switch (requestType) {
      case "post":
        return axios
          .post("http://3.34.190.67/api/", form_data, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => console.log(res))
          .catch((error) => console.error(error));

      case "put":
        return axios
          .put("http://3.34.190.67/api/" + artifactID + "/", form_data, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => console.log(res))
          .catch((error) => console.error(error));
    }
  };

  handleUpload = (e) => {
    this.setState({
      image: e.file,
    });
  };

  render() {
    return (
      <div>
        <Form
          onSubmitCapture={(event) =>
            this.handleSubmit(
              event,
              this.props.requestType,
              this.props.artifactID
            )
          }
        >
          <FormItem label="Title">
            <Input name="title" placeholder="Put a title here" />
          </FormItem>

          <FormItem
            name="upload"
            label="Upload"
            getValueFromEvent={this.handleUpload}
            extra="upload image"
          >
            <Upload name="image" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </FormItem>

          <FormItem label="Description">
            <Input
              name="description"
              placeholder="Enter some description ..."
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
