import React, { Component } from 'react';
import axios from 'axios';
import { List, Form, Input } from 'antd';

class Comment extends Component {
    
    state = {
        comment : []
    }

    componentDidMount() {
        const artifactID = this.props.artifactID;
        axios.get('http://127.0.0.1:8000/comments/api/?artifactID=' + artifactID)
            .then(res => {
                this.setState({
                    comment : res.data
                });
            })
    }

    render() {
        return (
            <div>
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
                        date={item.date} />
                        <p>{item.content}</p>
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Comment;