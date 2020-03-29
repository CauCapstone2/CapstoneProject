import React from 'react';
import axios from 'axios';
import { Card } from 'antd'; 

class ArtifactDetail extends React.Component{

    state = {
        artifact: {}
    }

    componentDidMount() {
        const artifactID = this.props.match.params.artifactID;
        axios.get('http://127.0.0.1:8000/api/' + artifactID)
            .then(res => {
                this.setState({
                    artifact : res.data
                });
            })
    }

    render(){
        return(
            <Card title = {this.state.artifact.title}>
                <img src = {this.state.artifact.image} alt = "img" width={272}></img>
                <p>{this.state.artifact.description}</p>
            </Card>
        )
    }
}

export default ArtifactDetail;