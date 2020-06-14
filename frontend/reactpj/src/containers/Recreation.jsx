import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, List } from "antd";
import "./ArtifactDetail.css";
import RegRecreation from "../containers/RegreCreation";

//props로 artifactID넘겨주기
class Recreation extends React.Component {
  state = {
    recreationItems: [],
    showCreate: false,
  };

  componentDidMount() {
    this.recreationImageCall(this.props.artifactID);
  }

  recreationImageCall = async (artifactID) => {
    await axios
      .get("http://127.0.0.1:8000/recreate/?artifactID=" + artifactID)
      .then((res) => {
        this.setState({
          recreationItems: res.data,
        });
      });
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
            onChange: (page) => {},
            pageSize: 7,
          }}
          grid={{ gutter: 5 }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <NavLink to={{ pathname: "/recreate/" + item.id }}>
                  <img
                    alt={item.id}
                    width={100}
                    height={100}
                    src={item.image}
                  />
                </NavLink>
              }
              style={{ marginLeft: "5px", marginRight: "5px" }}
            ></List.Item>
          )}
        />
        <RegRecreation
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
