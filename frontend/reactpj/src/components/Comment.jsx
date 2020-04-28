import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Input, List } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Comment extends Component {
    handleComment = async (event) => {
        await axios.post('http://127.0.0.1:8000/comments/api/', {
            userID: this.props.userid,
            content: event.target.elements[0].value,
            artifactID: this.props.artifactID
        }).then(res => console.log(res)).catch(error => console.error(error));
    }
    
    render() {
        return (
            <div className="comments">
                <div className="comment-header"><h2>Comments</h2></div>
                <List itemLayout="vertical" size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.props.comment}
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

                <Form onSubmitCapture={(event) => this.handleComment(event)}>
                    <FormItem>
                        <TextArea rows={4} allowClear="true" />
                    </FormItem>
                    <FormItem className="button-box">
                        <Button type="primary" htmlType="submit">comment</Button>
                    </FormItem>
                </Form>

            </div>
        );
    }
}

export default Comment;