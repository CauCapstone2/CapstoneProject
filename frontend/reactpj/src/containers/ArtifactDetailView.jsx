import React from 'react';
import axios from 'axios';
import { Card, Button, Typography, Col, Row} from 'antd'; 

import CustomForm from '../components/RegArtifact';

const { Title, Paragraph } = Typography;

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

            // <div>
            //     <Row align = 'middle'>
            //         <Col span = {12} gutter = {[16, 16]} align = 'middle'>
            //             <div>
            //                 <img src = {this.state.artifact.image} alt = "img" width = {'100%'} height = {'100%'}></img>
            //             </div>
            //         </Col>
            //         <Col span = {12} align = 'middle'>
            //             <Typography>
            //                 <Title>{this.state.artifact.title}</Title>
            //                 <Paragraph>{this.state.artifact.description}</Paragraph>
            //             </Typography>
            //         </Col>
            //     </Row>
            // </div>
        )
    }
}

export default ArtifactDetail;