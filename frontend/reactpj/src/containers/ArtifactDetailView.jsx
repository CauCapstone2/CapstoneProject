import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd'; 

import CustomForm from '../components/Form';

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

    handleDelete = async (event) => {
        const artifactID = this.props.match.params.artifactID;
        axios.delete('http://127.0.0.1:8000/api/' + artifactID);
        await this.props.history.push('/');
        this.forceUpdate();
        window.location.reload();
    }

    render(){
        return(
            <div>
                <Card title = {this.state.artifact.title}>
                    <img src = {this.state.artifact.image} alt = "img" width={272}></img>
                    <p>{this.state.artifact.description}</p>
                </Card>
                <CustomForm requestType="put" artifactID={this.props.match.params.artifactID} btnText="Update"/>
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        )
    }
}

export default ArtifactDetail;