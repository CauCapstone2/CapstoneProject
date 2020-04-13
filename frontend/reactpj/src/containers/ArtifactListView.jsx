import React from "react";
import axios from "axios";
import Artifact from "../components/Artifact";
import { Button } from "antd";

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
    return (
        isLoading ? (
          <div ref={this.wrapper}>
            <span>Loading....</span>
          </div>
        ) : (
          <div ref={this.wrapper}>
            {artifacts.map((artifact) => (
              <Artifact key={artifact.id} data={artifact} />
            ))}
            <Button href="/artifacts/register">Write</Button>
          </div>
        )
    );
  }
}

export default ArtifactList;
