import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { Button, Row, Col, Typography, List, Avatar, Divider, Carousel } from "antd";
import "./ArtifactDetail.css";
import EvaluationForm from "../components/EvaluationForm";
import Evaluation from "../components/Evaluation";
import Comment from "../components/Comment";
import Report from "../components/Report";

const { Title, Paragraph, Text } = Typography;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
//props로 artifactID넘겨주기
class Recreation extends React.Component {

    state = {
        recreationItems: [],
    }

    // handleCancel = () => this.setState({ previewVisible: false });

    // handlePreview = async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }

    //     this.setState({
    //         previewImage: file.url || file.preview,
    //         previewVisible: true,
    //         previewTitle:
    //             file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    //     });
    // }

    recreationImageCall = async (artifactID) => {
        await axios.get('thhp://127.0.0.1:8000/recreate?artifactID=' + artifactID)
            .then(res => {
                this.setState({
                    recreationItems : res.data.result, // unknown
                });
            })
    }

    // baseArtifactCall = async (artifactID) => {
    //     axios.get('http://127.0.0.1:8000/artifacts/api/' + artifactID)
    //         .then(res => {
    //             this.setState({
    //                 baseArtifact: res.data.result,
    //             });
    //         })
    // }

    // handleSubmit = async (event, requestType, recreationID, artifactID) => {
    //     await this.recreationArtifactUpload(event, requestType, artifactID)
    // }

    // recreationArtifactUpload = async (event) => {
    //     const artifactID = this.props.location.state.id;
    //     let form_data = new FormData();
    //     let image_list = [];
    //     this.state.fileList.forEach((el) => image_list.push(el.originFileObj));
    //     form_data.append("userID", this.props.userid);
    //     form_data.append("title", event.target.elements.title.value);
    //     form_data.append("description", event.target.elements.description.value);
    //     form_data.append("artifactID", this.props.artifact.id); // 수정가능
    //     this.state.fileList.forEach((el) =>
    //         form_data.append("images", el.originFileObj, el.originFileObj.name)
    //     );

    //     switch (this.props.location.state.requestType) {
    //         case "post":
    //             await axios.post("http://127.0.0.1:8000/recreation/create/", form_data, {
    //                 headers: {
    //                     "contetn-type": "multipart/form-data",
    //                 },
    //             });
    //             break;
    //         case "put":
    //             this.props.history.push("/artifacts/" + artifactID);
    //     }
    // }

    render() {
        const { recreationItems } = this.state;
        var total = recreationItems.length;
        return(
            <List itemLayout='horizontal' size='large' dataSource={recreationItems} footer = {<div><b>total {total}items</b></div>}
                  pagination={{onChange : page => {console.log(page);}, pageSize : 7}}
                  renderItem={item => (
                      <List.Item key={item.id} extra={<img width={100} height={100} alt="recreationImage" src={item.image}/>}
                                 style={{marginLeft:'5px', marginRight:'5px'}}>
                      </List.Item>
                  )}
            />
        )
    }
}

export default connect(mapStateToProps)(Recreation);
