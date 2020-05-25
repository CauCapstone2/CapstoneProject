import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, NavLink, withRouter } from "react-router-dom";
import { Container, Image, Nav } from "react-bootstrap";
import { Button, Row, Col, Typography, List, Avatar, Divider, Carousel, Progress } from "antd";
import "./ArtifactDetail.css";
import RegCreation from "../containers/RegreCreation";

const { Title, Paragraph, Text } = Typography;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
//props로 artifactID넘겨주기
class Recreation extends React.Component {

    state = {
        recreationItems: [],
        showCreate: false,
    }

    componentDidMount() {
        console.log(this.props.artifactID);
        this.recreationImageCall(this.props.artifactID);
        console.log(this.state);
    }

    recreationImageCall = async (artifactID) => {
        await axios.get('http://127.0.0.1:8000/recreate?artifactID=' + artifactID)
            .then(res => {
                console.log(res);
                this.setState({
                    recreationItems: res.data, // unknown
                });
            })
    }

    recreationUpload = async (event) => {
        const artifactID = this.props.artifactID;
        let form_data = new FormData();
        let image_list = [];
        this.state.fileList.forEach((el) => image_list.push(el.originFileObj));
        form_data.append("userID", this.props.userid);
        form_data.append("title", event.target.elements.title.value);
        form_data.append("description", event.target.elements.description.value);
        form_data.append("artifactID", this.props.artifactID);
        this.state.fileList.forEach((el) =>
            form_data.append("images", el.originFileObj, el.originFileObj.name)
        );

        switch (this.props.location.state.requestType) {
            case "post":
                await axios.post("http://127.0.0.1:8000/recreate/create/", form_data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
                break;

            case "put":
                this.props.history.push("/recreate/" + artifactID);
        }
    }

    createButtonClicked = () => {
        this.setState({
            showCreate: true,
        })
        console.log(this.state.showCreate);
    }

    regModalhandleOk = () => {
        this.setState({
            showCreate: false,
        });
    }

    regModalhandleCancel = () => {
        this.setState({
            showCreate: false,
        });
    }

    render() {
        const { recreationItems } = this.state;
        var total = recreationItems.length;
        return (
            <div>
                <List itemLayout='horizontal' size='large' dataSource={recreationItems} footer={<div><b>total {total} items</b><br />
                    <Button type="primary" onClick={this.createButtonClicked}>Create</Button></div>}
                    pagination={{ onChange: page => { console.log(page); }, pageSize: 7 }} grid={{ gutter: 5 }}
                    renderItem={item => (
                        <List.Item key={item.id} extra={
                            <NavLink
                                to={{pathname: '/recreate/' + item.id}}><img width={100} height={100} src={item.image} /></NavLink>}
                            style={{ marginLeft: '5px', marginRight: '5px' }}>
                        </List.Item>
                    )}
                />
                <RegCreation artifactID={this.props.artifactID} visible={this.state.showCreate}
                    onOk={this.regModalhandleOk} onCancel={this.regModalhandleCancel} requestType={this.props.requestType} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userid: state.userid,
    }
}

export default connect(mapStateToProps)(Recreation);


// import React, { useState } from 'react';
// import { Button, Modal, Form, Input, Radio } from 'antd';

// const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
//   const [form] = Form.useForm();
//   return (
//     <Modal
//       visible={visible}
//       title="Create a new collection"
//       okText="Create"
//       cancelText="Cancel"
//       onCancel={onCancel}
//       onOk={() => {
//         form
//           .validateFields()
//           .then(values => {
//             form.resetFields();
//             onCreate(values);
//           })
//           .catch(info => {
//             console.log('Validate Failed:', info);
//           });
//       }}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         name="form_in_modal"
//         initialValues={{
//           modifier: 'public',
//         }}
//       >
//         <Form.Item
//           name="title"
//           label="Title"
//           rules={[
//             {
//               required: true,
//               message: 'Please input the title of collection!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item name="description" label="Description">
//           <Input type="textarea" />
//         </Form.Item>
//         <Form.Item name="modifier" className="collection-create-form_last-form-item">
//           <Radio.Group>
//             <Radio value="public">Public</Radio>
//             <Radio value="private">Private</Radio>
//           </Radio.Group>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// const CollectionsPage = () => {
//   const [visible, setVisible] = useState(false);

//   const onCreate = values => {
//     console.log('Received values of form: ', values);
//     setVisible(false);
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(true);
//         }}
//       >
//         New Collection
//       </Button>
//       <CollectionCreateForm
//         visible={visible}
//         onCreate={onCreate}
//         onCancel={() => {
//           setVisible(false);
//         }}
//       />
//     </div>
//   );
// };

// ReactDOM.render(<CollectionsPage />, mountNode);