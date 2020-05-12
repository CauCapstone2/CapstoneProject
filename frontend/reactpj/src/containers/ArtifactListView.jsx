import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Artifact from "../components/Artifact";
import { Button, Row, Col, Pagination, Typography } from "antd";

const {Title} = Typography;

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
    const res = await axios.get("http://127.0.0.1:8000/artifacts/api/");
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
    const res = await axios.get("http://127.0.0.1:8000/artifacts/api?page=" + page);
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
        <div className = "title-text" title = "loading_message">
          <Typography>
            <Title style = {{color : "white"}}>
              Arts are now loading
            </Title>
          </Typography>
        </div>
      </div>
    ) : (
      <div style = {{marginTop : 10, marginLeft : 10, marginRight : 10, marginBottom : 10}} ref={this.wrapper}>
        <Row align = 'middle' gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}>
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
              size = "small"
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

export default ArtifactList;