import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';

class Report extends Component {

    // constructor(props){
    //     super(props);
    //     this.updateReport();
    // }

    state={
        isReported : false
    }
    
    componentDidMount(){
        this.updateReport();
    }

    // axios.get('http://127.0.0.1:8000/report/api/'+this.props.userid+'/?artifactID=' + this.props.artifactID)
    updateReport = () => {
        axios.get('http://127.0.0.1:8000/report/api/?artifactID=' + this.props.artifactID)
        .then(res => {
            console.log(res.data);
            for (var i in res.data) {
                if (this.props.userid == res.data[i].userID) {
                    this.state.isReported=true;          
                }
            }
            if(res.data.length > 100){
                axios.delete('http://127.0.0.1:8000/api'+this.props.artifactID)
                .the(res => console.log(res)).catch(error => console.error(error));
            }
            // if(res!=null) this.state.isReported=true;
        }).catch(error => console.error(error))
    }

    submitReport = () => {
        axios.post('http://127.0.0.1:8000/report/api/', {
            userID: this.props.userid,
            artifactID: this.props.artifactID,
        }).then(res => console.log(res)).catch(error => console.error(error));
        this.setState({
            isReported : true
        });
    }

    cancelReport = () => {
        axios.delete('http://127.0.0.1:8000/report/api/'+this.props.userid+'/?artifactID=' + this.props.artifactID)
        .then(res => console.log(res)).catch(error => console.error(error));
        this.setState({
            isReported : false
        });
    }

    render() {
        this.updateReport();
        return this.state.isReported ? (
            <div>
                <Button danger onClick={this.cancelReport}>Cancel</Button>
            </div>
        ) : (
            <div>
                <Button type="primary" danger onClick={this.submitReport}>
                    Report
                </Button>
            </div>
        );
    }
}

export default Report;