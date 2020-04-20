import React, { Component } from 'react';
import { Button, Typography } from 'antd';
import '../css/MainPage.css';
import {connect} from 'react-redux';

const { Title, Paragraph } = Typography;

class MainPage extends Component {

  // showDrawer = () => {
  //   this.setState({
  //     signupDrawer : true,
  //   });
  // }

  // onClose = () => {
  //   this.props.setState({
  //     signupDrawer : false,
  //   });
  // }

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
              {/* <div onClick = {this.props.showSignupDrawer}>
                <Button  type = "primary" ghost size = "large">Start with IIF</Button>
              </div> */}
                <Button onClick = {this.props.showSignupDrawer} type = "primary" ghost size = "large">Start with IIF</Button>
            </div>
          </div>
    </div>
    );
  }
}
//export default MainPage;

function mapDispatchToProps(dispatch) {
  return {
      onClick : function(signupDrawer) {
          dispatch({signupDrawer : true});
      }
  }
}

export default connect(null, mapDispatchToProps)(MainPage);