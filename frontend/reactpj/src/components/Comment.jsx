import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, List } from "antd";

const { TextArea } = Input;
const FormItem = Form.Item;

class Comment extends Component {
  error = (userid) => {
    if (userid === null)
      Modal.error({
        title: "Please Log in",
      });
  };

  deleteCommentButton = (id, userID) => {
    return parseInt(this.props.userid) === userID ? (
      <div>
        <Button type="link" onClick={() => this.deleteComment(id)}>
          delete
        </Button>
      </div>
    ) : null;
  };

  deleteComment = async (id) => {
    await axios.delete("http://127.0.0.1:8000/comments/api/" + id);
    this.props.updateComment(this.props.artifactID);
  };

  handleComment = async (event) => {
    if (this.props.userid === null) return;
    var input = event.target.elements[0].value;
    await axios.post("http://127.0.0.1:8000/comments/api/", {
      userID: this.props.userid,
      content: input,
      artifactID: this.props.artifactID,
    });
    this.props.updateComment(this.props.artifactID);
  };

  render() {
    return (
      <div className="comments">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 5,
          }}
          dataSource={this.props.comment}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                style={{ minWidth: "70vh", maxWidth: "60vh" }}
                content={item.content}
                name={item.username}
                date={item.date}
              />
              <div className="comment-info">
                <p className="comment-username">{item.username}</p>
                <p className="comment-date">{item.date}</p>
              </div>
              <div>
                <p>{item.content}</p>
              </div>
              <div className="comment-delete">
                {this.deleteCommentButton(item.id, item.userID)}
              </div>
            </List.Item>
          )}
        />
        <Form onSubmitCapture={(event) => this.handleComment(event)}>
          <FormItem>
            <TextArea
              style={{ minWidth: "70vh" }}
              id="comment-input"
              rows={4}
              allowClear="true"
            />
          </FormItem>
          <FormItem className="button-box">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => this.error(this.props.userid)}
            >
              comment
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Comment;
