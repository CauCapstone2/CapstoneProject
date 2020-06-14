import React, { Component } from "react";
import { Button, Typography } from "antd";
import "../css/MainPage.css";
import { connect } from "react-redux";
import * as actions from "../modules/auth";

const { Title, Paragraph } = Typography;

class MainPage extends Component {
  mainpageButtonClick = () => {
    this.props.firstDrawerOpen();
    this.props.signupDrawerOpen();
  };

  render() {
    return (
      <div>
        <div className="content-background" alt="">
          <div className="title-text" title="contents">
            <Typography>
              <Title style={{ color: "white" }}>
                For Better Grow of Your Arts
              </Title>
              <Paragraph style={{ color: "white" }}>
                IIF means Iudicium In Foro, which means Evaluation of Market
                <br />
                We provide you specific measurement for your art based on
                professional statics
                <br />
              </Paragraph>
              <Paragraph style={{ color: "white" }}>
                Because there wasn't any flatform for Fine Arts, we decided to
                build this
                <br />
                You can get evaluation from other artists and also can give them
                evaluation with yours
              </Paragraph>
            </Typography>
            <Button
              onClick={this.mainpageButtonClick}
              type="primary"
              ghost
              size="large"
            >
              Start with IIF
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupDrawerOpen: () => dispatch(actions.signupDrawerOpen()),
    firstDrawerOpen: () => dispatch(actions.firstDrawerOpen()),
  };
};

export default connect(null, mapDispatchToProps)(MainPage);
