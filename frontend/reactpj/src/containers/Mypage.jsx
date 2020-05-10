import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Descriptions, Form, Input, List, Row, Col, Avatar, Comment } from 'antd';
import { Container, Image } from 'react-bootstrap';
import './ArtifactDetail.css';

// import Comment from '../components/Comment';
import CustomForm from '../components/RegArtifact';
import Artifact from '../components/Artifact';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const FormItem = Form.Item;;

class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    state = {
        userInfo: [],
        artifact: [],
        comment: []
    }

    componentDidMount() {
        this.userInformationCall(this.props.userid);
        this.userArtifactCall(this.props.userid);
        this.userCommentCall(this.props.userid);
        console.log('mount state');
        console.log(this.props.userid);
        console.log(this.state.userInfo);
        console.log(this.state.artifact);
        console.log(this.state.comment);
    }

    userInformationCall = async (userID) => {
        axios.get('http://127.0.0.1:8000/mypage/user/?id=' + 1)
            .then(res => {
                this.setState({
                    userInfo: res.data
                });
            })
    }

    userArtifactCall = async (userID) => {
        //const userID = this.props.userid
        axios.get('http://127.0.0.1:8000/mypage/artifacts/?userID=' + 1)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
            })
    }

    userCommentCall = async (userID) => {
        //const userID = this.props.userid
        axios.get('http://127.0.0.1:8000/mypage/comments/?userID=' + 1)
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
        const { userInfo, artifact, comment } = this.state;
        return (
            <div>
                <Row justify='center' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Descriptions title="User Info" bordered layout='vertical'>
                        <Descriptions.Item label="User Name">
                            {userInfo.map((userInfo, index) => (
                                <h>{userInfo.username}</h>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="registered Email">
                            {userInfo.map((userInfo, index) => (
                                <h>{userInfo.email}</h>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="current Coins">150 credit</Descriptions.Item>
                    </Descriptions>
                </Row>
                <Row align='middle' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]} >
                        {artifact.map((artifact, index) => (
                            <Col key={index} span={6}>
                                <NavLink to={{ pathname: `/artifacts/${artifact.id}` }} style={{ color: 'black' }}>
                                    <Artifact key={artifact.id} data={artifact} />
                                </NavLink>
                            </Col>
                        ))}
                    </Row>
                </Row>
                <Row justify='center' style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <List itemLayout="vertical" size="large" dataSource={comment} footer={<div><b>Iudicium In Foro</b>comment footer part</div>}
                        pagination={{ onChange: page => { console.log(page); }, pageSize: 5, }}
                        renderItem={item => (
                            <List.Item key={item.artifactID.id} extra={<img width={250} height={180} alt="logo" src={item.artifactID.image} />}
                                style={{ marginBottom: '10px' }}>
                                <List.Item.Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href={"http://localhost:3000/artifacts/" + item.artifactID.id}>{item.artifactID.title}</a>}
                                    description={item.artifactID.username}
                                    style={{ minWidth: '80vh', maxWidth: '60vh' }}
                                />
                                {item.artifactID.description}
                                <br />
                                <Comment author={<a>{item.username}</a>}
                                    content={item.content}
                                    datetime={item.date}
                                />
                            </List.Item>
                        )}
                    />
                </Row>

                {/* <Row justify = 'center' style = {{marginLeft : '10px', marginRight : '10px'}}>
                    <List itemLayout="vertical" size="large" style={{alignItems : 'middle'}}
                        dataSource={comment}
                        renderItem={item => (
                            <NavLink to={{pathname : `/artifacts/${item.artifactID.id}`}}>
                                <List.Item>
                                    <div classname="comment-info">
                                        <p className="comment-username">{item.username}</p>
                                        <p className="comment-date">{item.date}</p>
                                    </div>
                                    <div><p>{item.content}</p></div>
                                </List.Item>
                            </NavLink>
                        )}
                        />
                </Row> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps, null)(Mypage);