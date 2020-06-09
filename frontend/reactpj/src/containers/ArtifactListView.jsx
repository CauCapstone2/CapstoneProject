import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Artifact from "../components/Artifact";
import { Button, Row, Col, Pagination, Typography } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as artifactListAction from "../modules/artifactlist";

const { Title } = Typography;

class ArtifactList extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    const { ArtifactListAction } = this.props;
    ArtifactListAction.getArtifactList(1);
  }

  onChange = (page) => {
    const { ArtifactListAction } = this.props;
    ArtifactListAction.getArtifactList(page);
  };

  render() {
    const { isLoading, artifactListData } = this.props;
    const artifacts = artifactListData.artifacts;
    const pagination = artifactListData.pagination;

    return isLoading ? (
      <div ref={this.wrapper}>
        <div className="title-text" title="loading_message">
          <Typography>
            <Title style={{ color: "white" }}>Arts are now loading</Title>
          </Typography>
        </div>
      </div>
    ) : (
        <div
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
          ref={this.wrapper}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Row align="middle" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}>
            {artifacts.map((artifact, index) => (
              <Col key={index} span={6}>
                <NavLink to={{ pathname: `/artifacts/${artifact.id}` }}>
                  <Artifact key={artifact.id} data={artifact} />
                </NavLink>
              </Col>
            ))}
          </Row>
          <Row type="flex" align="middle">
            <Col span={6} align="middle">
              <NavLink
                to={{
                  pathname: "/artifacts/s/register",
                  state: { requestType: "post", btnText: "Create" },
                }}
              >
                <Button>Write</Button>
              </NavLink>
            </Col>
            <Col span={12} align="middle">
              <Pagination
                size="small"
                total={pagination.count}
                pageSize={12}
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                onChange={this.onChange}
              />
            </Col>
            <Col span={6} align="middle">
              <Button>extra</Button>
            </Col>
          </Row>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    artifactListData: state.artifactlist.data,
    loading: state.pender.pending["GET_POST"],
    error: state.pender.failure["GET_POST"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ArtifactListAction: bindActionCreators(artifactListAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtifactList);
