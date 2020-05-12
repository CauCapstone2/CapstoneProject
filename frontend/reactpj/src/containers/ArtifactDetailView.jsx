import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import { Container, Image } from 'react-bootstrap';
import { Button } from 'antd';
import './ArtifactDetail.css';
import EvaluationForm from '../components/EvaluationForm';
import Evaluation from '../components/Evaluation';
import Comment from '../components/Comment';
import Report from '../components/Report';

class ArtifactDetail extends React.Component {

    state = {
        artifact: [],
        comment: [],
        eval: [],
        isReported: false,
    }

    componentDidMount() {
        console.log(this.props);
        const artifactID = this.props.match.params.artifactID;
        axios.get('http://127.0.0.1:8000/artifacts/api/' + artifactID)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
            })
        this.updateEvaluation(artifactID);
        this.updateComment(artifactID);
    }

    deleteArtifact = async (id) => {
        await axios.delete('http://127.0.0.1:8000/artifacts/api/' + id);
        this.props.history.push('/artifactlist');
        this.forceUpdate();
        window.location.reload();
    }

    modifyButton = (id, userID) => {
        return this.props.userid == userID ? (
            <div>
                <Button type="link" onClick={() => this.deleteArtifact(id)}>delete</Button>
                <NavLink to = {{ 
                    pathname: '/artifacts/s/register', 
                    state: { id: id, userid : userID, requestType:"put", btnText : "update" } }}>
                        Update
                </NavLink>
            </div>
        ) : null
    }

    updateComment = (artifactID) => {
        axios.get('http://127.0.0.1:8000/comments/api/?artifactID=' + artifactID)
            .then(res => {
                this.editDate(res.data);
                this.setState({
                    comment: res.data.reverse()
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

    preEval = () => {
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
            data[i].date = data[i].date.replace("Z", " ");
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
                <div className="modifyButton">{this.modifyButton(this.state.artifact.id, this.state.artifact.userID)}</div>
                </div>

                <Container>
                    <div className="art-box">
                        <Image className="art" width="700" src={this.state.artifact.image} />
                    </div>
                    <div className="description">
                        <h2> {this.state.artifact.title} </h2>
                        <h5> {this.state.artifact.username} </h5>
                        <p> {this.state.artifact.description} </p>
                    </div>
                    <Evaluation eval={this.state.eval} />
                    <EvaluationForm updateEvaluation={this.updateEvaluation} preEval={this.preEval()} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />

                    <Comment updateComment={this.updateComment} comment={this.state.comment} artifactID={this.props.match.params.artifactID} userid={this.props.userid} />
                    <Report artifactID={this.props.match.params.artifactID} userid={this.props.userid} isReported={this.state.isReported} />
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