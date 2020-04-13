import React from "react";
import axios from "axios";
import Artifact from "../components/Artifact";
import { Button, Row, Col, Divider } from "antd";

class ArtifactList extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  state = {
    isLoading: true,
    artifacts: [],
  };

  getArtifacts = async () => {
    const { data: artifacts } = await axios.get("http://127.0.0.1:8000/api/");
    this.setState({ artifacts: artifacts, isLoading: false });
  };

  componentDidMount() {
    this.getArtifacts();
  }

  render() {
    const { isLoading, artifacts } = this.state;
    return isLoading ? (
      <div ref={this.wrapper}>
        <span>Loading...</span>
      </div>
    ) : (
      <div ref={this.wrapper}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {artifacts.map((artifact) => (
            <Col span={6}>
              <Artifact key={artifact.id} data={artifact} />
            </Col>
          ))}
        </Row>
        <Divider>
          <Button href="/artifacts/s/register">Write</Button>
        </Divider>
      </div>
    );
  }
}

export default ArtifactList;
