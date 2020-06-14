import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Typography, List } from "antd";
import "./ArtifactDetail.css";
import RegCreation from "../containers/RegreCreation";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
//props로 artifactID넘겨주기
class Recreation extends React.Component {
  state = {
    recreationItems: [],
    showCreate: false,
  };

  // componentWillUpdate = (nextProps, nextState) => {
  //   if(this.state.recreationItems.length != nextState.recreationItems.length) {
  //     // this.recreationImageCall(this.props.artifactID);
  //     console.log("componentwillupdate");
  //   }
  // };

  componentDidMount() {
    this.recreationImageCall(this.props.artifactID);
  }

  // componentDidUpdate() {
  //   this.recreationImageCall(this.props.artifactID);
  // }

  recreationImageCall = async (artifactID) => {
    await axios
      .get("http://127.0.0.1:8000/recreate/?artifactID=" + artifactID)
      .then((res) => {
        this.setState({
          recreationItems: res.data,
        });
      });
  };

  recreationUpload = async (event) => {
    const artifactID = this.props.artifactID;
    let form_data = new FormData();
    let image_list = [];
    this.state.fileList.forEach((el) => image_list.push(el.originFileObj));
    form_data.append("userID", this.props.userid);
    form_data.append("title", event.target.elements.title.value);
    form_data.append("description", event.target.elements.description.value);
    form_data.append("artifactID", this.props.artifactID);
    this.state.fileList.forEach((el) =>
      form_data.append("images", el.originFileObj, el.originFileObj.name)
    );

    switch (this.props.location.state.requestType) {
      case "post":
        await axios.post("http://127.0.0.1:8000/recreate/create/", form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        break;

      case "put":
        this.props.history.push("/recreate/" + artifactID);
    }
    this.recreationImageCall(artifactID);
  };

  createButtonClicked = () => {
    this.setState({
      showCreate: true,
    });
  };

  regModalhandleOk = () => {
    this.setState({
      showCreate: false,
    });
  };

  regModalhandleCancel = () => {
    this.setState({
      showCreate: false,
    });
  };

  render() {
    const { recreationItems } = this.state;
    var total = recreationItems.length;
    return (
      <div>
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={recreationItems}
          footer={
            <div>
              <b>total {total} items</b>
              <br />
              <Button type="primary" onClick={this.createButtonClicked}>
                Create
              </Button>
            </div>
          }
          pagination={{
            onChange: (page) => {
            },
            pageSize: 7,
          }}
          grid={{ gutter: 5 }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <NavLink to={{ pathname: "/recreate/" + item.id }}>
                  <img width={100} height={100} src={item.image} />
                </NavLink>
              }
              style={{ marginLeft: "5px", marginRight: "5px" }}
            ></List.Item>
          )}
        />
        <RegCreation
          artifactID={this.props.artifactID}
          visible={this.state.showCreate}
          onOk={this.regModalhandleOk}
          onCancel={this.regModalhandleCancel}
          requestType={this.props.requestType}
          itemReload={this.recreationImageCall}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(Recreation);
