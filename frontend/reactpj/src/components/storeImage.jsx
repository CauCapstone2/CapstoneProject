import React, { Component } from 'react';
import axios from "axios";
import { Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

const FileDownload = require('react-file-download');

class StoreImage extends Component {
    
    handledownload = () => {
        axios.get(this.props.image,{
            responseType : "blob"
        }).then((response) => {
            const fileType = response.headers['content-type'].split('/')[1];
            FileDownload(response.data, 'IIF_image.'+fileType);
        });
    }

    render() {
        return (
            <a href={this.props.image} target="_blank" download onClick={this.handledownload}>
                <Button className="download" type="primary" icon={<DownloadOutlined />}>
                    download
                </Button>
            </a>
        );
    }
}

export default StoreImage;