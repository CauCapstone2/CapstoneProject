import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Statistic, Form, Input, List, Row, Col, Avatar, Comment, Typography, Progress, Divider } from 'antd';
import { Container, Image } from 'react-bootstrap';
import './ArtifactDetail.css';

// import Comment from '../components/Comment';
import CustomForm from '../components/RegArtifact';
import Artifact from '../components/Artifact';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const FormItem = Form.Item;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    state = {
        userInfo: [],
        artifact: [],
        comment: [],
        evaluation: [],
    }

    componentDidMount() {
        this.userInformationCall(this.props.userid);
        this.userArtifactCall(this.props.userid);
        this.userCommentCall(this.props.userid);
    }

    userInformationCall = (userID) => {
        axios.get('http://127.0.0.1:8000/mypage/user/?id=' + 1)
            .then(res => {
                this.setState({
                    userInfo: res.data
                });
            })
    }

    userArtifactCall = async (userID) => {
        //const userID = this.props.userid
        await axios.get('http://127.0.0.1:8000/mypage/artifacts/?userID=' + 1)
            .then(res => {
                this.setState({
                    artifact: res.data
                });
                this.userEvaluationCall(res.data);
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

    userEvaluationCall = async (data) => {
        var _evaluation = [0, 0, 0, 0, 0];
        var _eval_num = 0;
        for (var i in data) {
            await axios.get('http://127.0.0.1:8000/evaluation/api/?artifactID=' + data[i].id)
                .then(res => {
                    if (res.data[0]) {
                        _eval_num++;
                        _evaluation[0] += res.data[0].Creative;
                        _evaluation[1] += res.data[0].Expressive;
                        _evaluation[2] += res.data[0].Quality;
                        _evaluation[3] += res.data[0].Popularity;
                        _evaluation[4] += res.data[0].Workability;
                    }
                });
        }
        for (var i in _evaluation) {
            _evaluation[i] = Math.floor((_evaluation[i] * 10) / _eval_num);
        }
        this.setState({
            evaluation: _evaluation
        });
    }

    editDate = (data) => {
        for (var i in data) {
            data[i].date = data[i].date.split(".")[0];
            data[i].date = data[i].date.replace("T", " ");
            data[i].date = data[i].date.replace("Z", " ")
        }
    }
    render() {

        const { userInfo, artifact, comment, evaluation } = this.state;
        return (
            <div className='outer-div'>
                <Row>
                    <Col align='middle' span={8} style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Row style={{ marginTop: '10%' }}>
                            <Col align='middle' span={8}>
                                <Card bordered={false} style={{ marginLeft: '5px' }}>
                                    <Statistic title="Written Artifacts" value={artifact.length} precision={0} valueStyle={{ color: '#0be881' }}
                                        prefix={<Avatar>Art</Avatar>} />
                                </Card>
                            </Col>
                            <Col align='middle' span={8}>
                                <Card bordered={false}>
                                    <Statistic title="Left Comments" value={comment.length} precision={0} valueStyle={{ color: '#ff3f34' }}
                                        prefix={<Avatar>Com</Avatar>} />
                                </Card>
                            </Col>
                            <Col align='middle' span={8}>
                                <Card bordered={false} style={{ marginRight: '5px' }}>
                                    <Statistic title="Done Evaluations" value={comment.length} precision={0} valueStyle={{ color: '#0fbcf9' }}
                                        prefix={<Avatar>Eval</Avatar>} />
                                </Card>
                            </Col>
                        </Row>
                        <Divider style={{ color: '#333', fontWeight: 'normal' }}>Your Activities</Divider>
                        {/* <Row align = 'middle' justify = 'center'>
                            <Text strong>Your Activities</Text>
                        </Row> */}
                    </Col>
                    <Col span={8} justify='center' align='middle' style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {userInfo.map((userInfo, index) => (
                            <div className='user-info'>
                                <Avatar size={100} style={{ marginTop: '15px', marginBottom: '10px' }} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                                <Typography>
                                    <Title>{userInfo.username}</Title>
                                    <Paragraph type='secondary'>{userInfo.email}</Paragraph>
                                    <Paragraph>Web developer, not only for performance but design factors also.</Paragraph>
                                </Typography>
                            </div>
                        ))}
                    </Col>
                    <Col align='middle' span={8} style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Row style={{ marginTop: '20%' }}>
                            {/* {evaluation.map((evaluation, index) => (
                                 <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                    <Progress strokeColor='#D2691E' type="circle" percent={evaluation[index]} width={60} />
                                 </Col>
                            ))} */}
                            <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                <Progress strokeColor='#D2691E' type="circle" percent={evaluation[0]} format={percent => `${percent / 10}`} width={60} />
                            </Col>
                            <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                <Progress strokeColor='#FFD700' type="circle" percent={evaluation[1]} format={percent => `${percent / 10}`} width={60} />
                            </Col>
                            <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                <Progress strokeColor='#1E90FF' type="circle" percent={evaluation[2]} format={percent => `${percent / 10}`} width={60} />
                            </Col>
                            <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                <Progress strokeColor='#0000CD' type="circle" percent={evaluation[3]} format={percent => `${percent / 10}`} width={60} />
                            </Col>
                            <Col span={4} style={{ marginRight: '3px', marginLeft: '3px' }}>
                                <Progress strokeColor='#98FB98' type="circle" percent={evaluation[4]} format={percent => `${percent / 10}`} width={60} />
                            </Col>
                        </Row>
                        <Divider style={{ color: '#333', fontWeight: 'normal' }}>Your Abilities</Divider>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>Uploaded Artifacts</Divider>
                <Row align='middle' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Row align='middle' justify='center' gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]} >
                        {artifact.map((artifact, index) => (
                            <Col key={index} >
                                <NavLink to={{ pathname: `/artifacts/${artifact.id}` }} style={{ color: 'black' }}>
                                    <Artifact key={artifact.id} data={artifact} />
                                </NavLink>
                            </Col>
                        ))}
                    </Row>
                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>Written Comments</Divider>
                <Row justify='center' style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <List itemLayout="vertical" size="large" dataSource={comment} footer={<div><b>Iudicium In Foro</b>comment footer part</div>}
                        pagination={{ onChange: page => { console.log(page); }, pageSize: 5, }}
                        renderItem={item => (
                            <List.Item key={item.artifactID.id} extra={<img width={250} height={180} alt="logo" src={item.artifactID.image} />}
                                style={{ marginBottom: '10px' }}>
                                <List.Item.Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href={"http://localhost:3000/artifacts/" + item.artifactID.id}>{item.artifactID.title}</a>}
                                    description={item.artifactID.username}
                                    style={{ minWidth: '50vh', maxWidth: '50vh' }}
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
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps)(Mypage);

