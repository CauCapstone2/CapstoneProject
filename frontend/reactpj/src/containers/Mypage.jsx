import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Statistic, Form, Input, List, Row, Col, Avatar, Comment, Typography, Progress, Divider, Tooltip, Spin, Alert } from 'antd';
import { Container, Image } from 'react-bootstrap';
import './ArtifactDetail.css';
import CustomForm from '../components/RegArtifact';
import Artifact from '../components/Artifact';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import MypageInfo from '../components/MypageInfo';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const FormItem = Form.Item;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const { Title, Paragraph } = Typography;

class Mypage extends React.Component {
  state = {
    userInfo: [],
    artifact: [],
    comment: [],
    evaluation: [],
    _eval_length: 0,
  };

    state = {
        userInfo: [],
        artifact: [],
        comment: [],
        _new_comments: [],
        evaluation: [],
        _eval_length: 0,
    }

    componentWillReceiveProps = (nextprops) => {
        if (this.props.userid != nextprops) {
            this.userInformationCall(nextprops.userid);
            this.userArtifactCall(nextprops.userid);
            this.userCommentCall(nextprops.userid);
        }
    }

    componentWillMount() {
        this.userInformationCall(this.props.userid);
        this.userArtifactCall(this.props.userid);
        this.userCommentCall(this.props.userid);
    }

    // componentDidMount() {
    //     this.userInformationCall(this.props.userid);
    //     this.userArtifactCall(this.props.userid);
    //     this.userCommentCall(this.props.userid);
    // }

    userInformationCall = (userID) => {
        axios.get('http://127.0.0.1:8000/mypage/user/?id=' + userID)
            .then(res => {
                this.setState({
                    userInfo: res.data
                });
            })
    }

    userArtifactCall = (userID) => {
        axios.get('http://127.0.0.1:8000/artifacts/api/?userID=' + userID)
            .then(res => {
                this.setState({
                    artifact: res.data.results
                });
                this.userEvaluationCall(res.data.results);
            })
    }

    userCommentCall = (userID) => {
        axios.get('http://127.0.0.1:8000/mypage/comments/?userID=' + userID)
            .then(res => {
                console.log(res.data);
                this.setState({
                    comment: res.data,
                });
                console.log("setstate done");
                this.recreationErase();
                console.log("recreationErase done");
            })
        //this.recreationErase();
    }

  userCommentCall = (userID) => {
    axios
      .get("http://127.0.0.1:8000/mypage/comments?userID=" + userID)
      .then((res) => {
        this.editDate(res.data);
        this.setState({
          comment: res.data,
        });
      });
  };

  userEvaluationCall = async (data) => {
    var _evaluation = [0, 0, 0, 0, 0];
    var _eval_num = 0;
    for (var i in data) {
      await axios
        .get("http://127.0.0.1:8000/evaluation/api/?artifactID=" + data[i].id)
        .then((res) => {
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
      evaluation: _evaluation,
      _eval_length: _eval_num,
    });
  };

  editDate = (data) => {
    for (var i in data) {
      data[i].date = data[i].date.split(".")[0];
      data[i].date = data[i].date.replace("T", " ");
      data[i].date = data[i].date.replace("Z", " ");
    }
  };
}

const mapStateToProps = (state) => {
    console.log("redux" + state.userid);
    return {
        userid: state.userid,
        isAuthenticated: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps)(Mypage);
