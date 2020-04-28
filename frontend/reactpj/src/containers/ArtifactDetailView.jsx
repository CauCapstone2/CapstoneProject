import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Image } from 'react-bootstrap';

import EvaluationForm from '../components/EvaluationForm';
import Evaluation from '../components/Evaluation';
import Comment from '../components/Comment';
import Report from '../components/Report';
import './ArtifactDetail.css';

class ArtifactDetail extends React.Component {

    state = {
        artifact: [],
        comment: [],
        eval: [],
    }

    componentDidMount() {
        const artifactID = this.props.match.params.artifactID;
        axios.get('http://127.0.0.1:8000/api/' + artifactID)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
            })
        this.updateEvaluation(artifactID);
        this.updateComment(artifactID);
    }

    handleDelete = async (event) => {
        const artifactID = this.props.match.params.artifactID;
        axios.delete('http://127.0.0.1:8000/api/' + artifactID);
        await this.props.history.push('/');
        this.forceUpdate();
        window.location.reload();
    }

    updateComment = (artifactID) => {
        axios.get('http://127.0.0.1:8000/comments/api/?artifactID=' + artifactID)
            .then(res => {
                this.editDate(res.data);
                this.setState({
                    comment: res.data
                });
            })
    }

    updateEvaluation = (artifactID) => {
        axios.get('http://127.0.0.1:8000/evaluation/api/?artifactID=' + artifactID)
            .then(res => {
                this.setState({
                    eval: res.data
                });
            })
    }

    preEvaluation = () => {
        for (var i in this.state.eval) {
            if (this.state.eval[i].userID == this.props.userid) {
                return this.state.eval[i];
            }
        }
    }

    editDate = (data) => {
        for (var i in data) {
            data[i].date = data[i].date.split(".")[0];
            data[i].date = data[i].date.replace("T", " ");
            data[i].date = data[i].date.replace("Z", " ")
        }
    }

    render() {
        return (
            <div>
                <div className="intro">
                    Iuducium In Foro
                </div>
                <div className="art-intro">
                    Content
                </div>

                <Container>
                    <div className="art-box">
                        <Image className="art" width="700" src={this.state.artifact.image} />
                    </div>
                    <div className="description">
                        <h2> {this.state.artifact.title} </h2>
                        <h5> Mr. Park </h5>
                        <p> {this.state.artifact.description} </p>
                    </div>

                    <Evaluation eval={this.state.eval} />
                    <EvaluationForm preEval={this.preEvaluation()} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />

                    <Comment comment={this.state.comment} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />
                    <Report />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps)(ArtifactDetail);