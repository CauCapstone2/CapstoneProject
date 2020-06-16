import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, List, Spin } from "antd";
import "./ArtifactDetail.css";
import RegRecreation from "../containers/RegRecreation";
import { bindActionCreators } from "redux";
import * as recreationAction from "../modules/recreation";

//props로 artifactID넘겨주기
class Recreation extends React.Component {
  state = {
    showCreate: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.artifactID !== this.props.artifactID) {
      this.recreationImageCall(nextProps.artifactID);
    }
    return true;
  }

  componentWillMount() {
    this.recreationImageCall(this.props.artifactID);
  }

  componentDidMount() {
    const { RecreationAction, artifactID } = this.props;
    RecreationAction.getRecreation(artifactID);
  }

  componentDidUpdate(prevProps) {
    const { RecreationAction, artifactID } = this.props;
    if (artifactID !== prevProps.artifactID) {
      RecreationAction.getRecreation(artifactID);
    }
  }

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
    const { recreation, loading } = this.props;
    if (!recreation) return <Spin tip="Loading..."></Spin>;

    let numRecreation = recreation.length;
    return (
      <div>
        {loading ? (
          <Spin tip="Loading..."></Spin>
        ) : (
          <List
            itemLayout="horizontal"
            size="large"
            dataSource={recreation}
            footer={
              <div>
                <b>total {numRecreation} items</b>
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
                  <NavLink exact to={`/artifacts/${item.id}`}>
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
        )}
        <RegRecreation
          artifactID={this.props.artifactID}
          visible={this.state.showCreate}
          onOk={this.regModalhandleOk}
          onCancel={this.regModalhandleCancel}
          requestType={this.props.requestType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userid,
    recreation: state.recreation.data,
    loading: state.pender.pending["recreation/GET_RECREATION"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RecreationAction: bindActionCreators(recreationAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recreation);
