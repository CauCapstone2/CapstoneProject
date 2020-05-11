import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Statistic, Form, Input, List, Row, Col, Avatar, Comment, Typography, Progress } from 'antd';
import { Container, Image } from 'react-bootstrap';
import './ArtifactDetail.css';

// import Comment from '../components/Comment';
import CustomForm from '../components/RegArtifact';
import Artifact from '../components/Artifact';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const FormItem = Form.Item;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        console.log("constructor");
        console.log(this.props.userid);
    }

    state = {
        userInfo: [],
        artifact: [],
        comment: []
    }

    componentDidMount() {
        console.log("componentDidmount start");
        console.log(this.props.userid);
        this.userInformationCall(this.props.userid);
        this.userArtifactCall(this.props.userid);
        this.userCommentCall(this.props.userid);
        console.log("componentDidmount end");
        console.log(this.props.userid);
    }

    userInformationCall = async (userID) => {
        console.log("userInfoCall start");
        console.log(userID);
        console.log(this.props.userid);
        await axios.get('http://127.0.0.1:8000/mypage/user/?id=' + 1)
            .then(res => {
                this.setState({
                    userInfo: res.data
                });
            })
        console.log("userInfoCall end");
    }

    userArtifactCall = async (userID) => {
        //const userID = this.props.userid
        await axios.get('http://127.0.0.1:8000/mypage/artifacts/?userID=' + 1)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
            })
    }

    userCommentCall = async (userID) => {
        //const userID = this.props.userid
        await axios.get('http://127.0.0.1:8000/mypage/comments/?userID=' + 1)
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
//<Progress type="circle" percent={30} width={80} />
    render() {
        const { userInfo, artifact, comment } = this.state;
        console.log("render start");
        console.log(this.props.userid);
        return (
            <div>
                {console.log("render start")}
                <Row justify='center' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                        <Col justify='center' align = 'middle' span={8} style = {{marginLeft : '10px', marginRight : '10px'}}>
                            <Row justify = 'center' align = 'middle' gutter = {16}>
                                <Col span = {8}>
                                    <Card>
                                        <Statistic title="Written Artifacts" value = {artifact.length} precision={2} valueStyle={{ color : '#0be881'}}
                                                   prefix={<Avatar>Art</Avatar>}/>
                                    </Card>
                                </Col>
                                <Col span = {8}>
                                    <Card>
                                        <Statistic title="Left Comments" value = {comment.length} precision={2} valueStyle={{ color : '#ff3f34'}}
                                                   prefix={<Avatar>Com</Avatar>}/>
                                    </Card>
                                </Col>
                                <Col span = {8}>
                                    <Card>
                                        <Statistic title="Done Evaluations" value = 'undefine' precision={2} valueStyle={{ color : '#0fbcf9'}}
                                                   prefix={<Avatar>Eval</Avatar>}/>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} justify = 'center' align = 'middle'>
                            {userInfo.map((userInfo, index) => (
                                <div>
                                    <Avatar size={100} style = {{marginTop : '15px', marginBottom : '10px'}} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                                    <Typography>
                                        <Title>{userInfo.username}</Title>
                                        <Paragraph type = 'secondary'>{userInfo.email}</Paragraph>
                                        <Paragraph>Web developer, not only for performance but design factors also.</Paragraph>
                                    </Typography>
                                </div>
                            ))}
                        </Col>
                        <Col align = 'middle' span={8} style = {{marginLeft : '10px', marginRight : '10px'}}>
                            <Row>
                            <Col span={4} style = {{marginRight : '5px', marginLeft : '5px'}}>
                                <Progress type="circle" percent={35.6} width={60} />
                            </Col>
                            <Col span = {4} style = {{marginRight : '5px', marginLeft : '5px'}}>
                                <Progress type="circle" percent={30} width={60} />
                            </Col>
                            <Col span = {4} style = {{marginRight : '5px', marginLeft : '5px'}}>
                                <Progress type="circle" percent={30} width={60} />
                            </Col>
                            <Col span = {4} style = {{marginRight : '5px', marginLeft : '5px'}}>
                                <Progress type="circle" percent={30} width={60} />
                            </Col>
                            <Col span = {4} style = {{marginRight : '5px', marginLeft : '5px'}}>
                                <Progress type="circle" percent={30} width={60} />
                            </Col>
                            {/* <Col span = {4} style = {{marginRight : '5px'}}>
                                <Progress type="circle" percent={30} width={60} />
                            </Col> */}
                            </Row>
                        </Col>
                </Row>
                <Row align='middle' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Row align='middle' gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]} >
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
                {console.log("render done")}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("mapStateToProps_mypage");
    console.log(state);
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps)(Mypage);

