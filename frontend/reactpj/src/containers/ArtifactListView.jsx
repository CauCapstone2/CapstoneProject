import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Artifact from "../components/Artifact";
import { Button, Row, Col, Divider, Pagination } from "antd";

class ArtifactList extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  state = {
    isLoading: true,
    artifacts: [],
    pagination: {},
  };

  getArtifacts = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/");
    this.setState({
      isLoading: false,
      artifacts: res.data.results,
      pagination: {
        count: res.data.count,
        prev: res.data.previous,
        next: res.data.next,
      },
    });
  };

  getArtifactsPage = async (page) => {
    const res = await axios.get("http://127.0.0.1:8000/api?page=" + page);
    this.setState({
      artifacts: res.data.results,
      pagination: {
        count: res.data.count,
        prev: res.data.previous,
        next: res.data.next,
      },
    });
  };

  componentDidMount() {
    this.getArtifacts();
  }

  onChange = (page) => {
    this.getArtifactsPage(page);
  };

  render() {
    const { isLoading, artifacts, pagination } = this.state;
    return isLoading ? (
      <div ref={this.wrapper}>
        <span>Loading...</span>
      </div>
    ) : (
      <div ref={this.wrapper}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
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
            <Button href="/artifacts/s/register">Write</Button>
          </Col>
          <Col span={12} align="middle">
            <Pagination
              total={pagination.count}
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

export default ArtifactList;