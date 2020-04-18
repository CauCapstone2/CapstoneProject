import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Avatar, Drawer, Button, Typography } from 'antd';
import '../css/MainPage.css';
import temporary from '../img/Web_logo.png';
import {
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const { Header, Content, Footer } = Layout;

class App extends Component {

  state = {
    visible : false,
    username : "Franklin Park",
  };

  showDrawer = () => {
    this.setState({
      visible : true,
    });
  }

  onClose = () => {
    this.setState({
      visible : false,
    });
  }
  render() {
    return(
      <div>
          <div className = "content-background" alt = "">
            <div className = "title-text" title = "contents">
              <Typography>
                <Title style = {{color : "white"}}>For Better Grow of Your Arts</Title>
                <Paragraph style = {{color : "white"}}>
                  IIF means Iudicium In Foro, which means Evaluation of Market<br/>
                  We provide you specific measurement for your art based on professional statics<br/>
                </Paragraph>
                <Paragraph style = {{color : "white"}}>
                  Because there wasn't any flatform for Fine Arts, we decided to build this<br/>
                  You can get evaluation from other artists and also can give them evaluation with yours
                </Paragraph>
              </Typography>
              <Button type = "primary" ghost size = "large">Start with IIF</Button>
            </div>
          </div>
    </div>
    );
  }
}
export default App;