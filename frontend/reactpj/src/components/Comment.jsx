import React, { Component } from "react";
import { Modal, Button, Form, Input, List } from "antd";
import { connect } from "react-redux";
import * as commentAction from "../modules/comment";
import { bindActionCreators } from "redux";

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
    const { CommentAction, artifactID } = this.props;

    await CommentAction.deleteComment(id);
    CommentAction.getComment(artifactID);
  };

  handleComment = async (event) => {
    const { CommentAction, userid, artifactID } = this.props;
    if (this.props.userid === null) return;
    let input = event.target.elements[0].value;
    let data = {
      userID: userid,
      content: input,
      artifactID: artifactID,
    };

    await CommentAction.postComment(data);
    CommentAction.getComment(artifactID);
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

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CommentAction: bindActionCreators(commentAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
