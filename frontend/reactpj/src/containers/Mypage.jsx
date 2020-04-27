import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button, Form, Input, List } from 'antd';
import { Container, Image } from 'react-bootstrap';
import './ArtifactDetail.css';

import Comment from '../components/Comment';
import CustomForm from '../components/RegArtifact';

const { TextArea } = Input;
const FormItem = Form.Item;;

class Mypage extends React.Component {

    state = {
        artifact: [],
        comment: []
    }

    componentDidMount() {
        const artifactID = this.props.match.params.artifactID;
        axios.get('http://127.0.0.1:8000/api/' + artifactID)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
            })
        this.updateComment(artifactID);
    }

    handleDelete = async (event) => {
        const artifactID = this.props.match.params.artifactID;
        axios.delete('http://127.0.0.1:8000/api/' + artifactID);
        await this.props.history.push('/');
        this.forceUpdate();
        window.location.reload();
    }

    handleSubmit = async (event, artifactID) => {
        await axios.post('http://127.0.0.1:8000/comments/api/', {
            userID: this.props.userid,
            content: event.target.elements[0].value,
            artifactID: artifactID
        }).then(res => console.log(res)).catch(error => console.error(error));
        this.updateComment(artifactID);
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

    editDate = (data) => {
        for (var i in data) {
            data[i].date = data[i].date.split(".")[0];
            data[i].date = data[i].date.replace("T", " ");
            data[i].date = data[i].date.replace("Z", " ")
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps)(ArtifactDetail);