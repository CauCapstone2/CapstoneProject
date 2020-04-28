import React, { Component } from 'react';
import { Button } from 'antd';

class Report extends Component {
    render() {
        return (
            <div>
                <Button type="primary" danger>
                    Report
                </Button>
                <Button danger>Cancel</Button>
            </div>
        );
    }
}

export default Report;