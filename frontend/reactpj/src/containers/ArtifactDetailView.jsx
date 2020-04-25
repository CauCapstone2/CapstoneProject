import React from 'react';
import axios from 'axios';
import { connect} from 'react-redux';
import { Card, Button, Form, Input,List } from 'antd'; 
import { Container, Image} from 'react-bootstrap';
import './ArtifactDetail.css';

import Comment from '../components/Comment';
import CustomForm from '../components/RegArtifact';

const { TextArea } = Input;
const FormItem = Form.Item;;

class ArtifactDetail extends React.Component{

    state = {
        artifact: [],
        comment : []
    }

    componentDidMount() {
        const artifactID = this.props.match.params.artifactID;
        axios.get('http://127.0.0.1:8000/api/' + artifactID)
            .then(res => {
                this.setState({
                    artifact : res.data
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
            userID : this.props.userid,
            content : event.target.elements[0].value,
            artifactID : artifactID
        }).then(res=>console.log(res)).catch(error=>console.error(error));
        this.updateComment(artifactID);
    }

    updateComment = (artifactID) => {
        axios.get('http://127.0.0.1:8000/comments/api/?artifactID=' + artifactID)
            .then(res => {
                this.editDate(res.data);
                this.setState({
                    comment : res.data
                });
            })
    }

    editDate = (data) => {
        for (var i in data) {
            data[i].date = data[i].date.split(".")[0];
            data[i].date = data[i].date.replace("T"," ");
            data[i].date = data[i].date.replace("Z"," ")
        }
    }

    render(){
        return(
            <div>
                {/* <Card title = {this.state.artifact.title}>
                    <img src = {this.state.artifact.image} alt = "img" width={272}></img>
                    <p>{this.state.artifact.description}</p>
                </Card>
                <CustomForm requestType="put" artifactID={this.props.match.params.artifactID} btnText="Update"/>
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form> */}

                <div className="intro">
                    Iuducium In Foro
                </div>
                <div className="art-intro">
                    Content
                </div>

                <Container>
                    <div className = "art-box">
                        <Image className = "art" width="700" src={this.state.artifact.image}/>
                    </div>
                    <div className="description">
                        <h2> {this.state.artifact.title} </h2>
                        <h5> Mr. Park </h5>
                        <p> {this.state.artifact.description} </p>
                    </div>
                    <div className="comments">
                        <div className="comment-header"><h2>Comments</h2></div>
                        <List itemLayout="vertical" size="large"
                            pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 5,
                            }}
                            dataSource={this.state.comment}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                content={item.content}
                                name={item.username}
                                date={item.date} />
                                <div classname="comment-info"><p className="comment-username">{item.username}</p>
                                <p className="comment-date">{item.date}</p></div>
                                <div><p>{item.content}</p></div>
                            </List.Item>
                            )} 
                        />
                    
                    <Form onSubmitCapture ={(event) => this.handleSubmit(event, this.props.match.params.artifactID)}>
                        <FormItem>
                            <TextArea rows={4} allowClear="true" />
                        </FormItem>
                        <FormItem className="button-box">
                            <Button type="primary" htmlType="submit">comment</Button>
                        </FormItem>
                    </Form>

                    </div>
                </Container>
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

const mapStateToProps = (state) => {
    return {
        userid : state.userid,
    }
}

export default connect(mapStateToProps)(ArtifactDetail);