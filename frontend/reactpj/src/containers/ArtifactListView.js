import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';
import Artifacts from '../components/Artifact';

class ArtifactList extends React.Component{

    state = {
        artifacts: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    artifacts : res.data
                });
            })
    }

    render(){
        return(
            <div>
                <Artifacts data={this.state.artifacts}/>
                <br/>
                <h2>Create an artifact</h2>
                <CustomForm requestType="post" artifactID={null} btnText="Create"/>
            </div>
        )
    }
}

export default ArtifactList;