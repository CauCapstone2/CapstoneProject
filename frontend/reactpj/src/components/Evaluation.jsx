import React, { Component } from "react";
import {
  List,
  Col,
  Row,
  Tooltip,
  Progress,
  Avatar,
  Typography,
  Divider,
} from "antd";
import "react-circular-progressbar/dist/styles.css";

const { Text } = Typography;

class Evaluation extends Component {
  render() {
    return (
      <div>
        {this.props.chart ? (
          <div>
            <Divider
              orientation="center"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Average Evaluation
            </Divider>
            <div className="eval-title">
              <p>Creative</p>
              <p>Expressive</p>
              <p>Quality</p>
              <p>Popularity</p>
              <p>Workability</p>
            </div>
            <Col>
              <Row style={{ marginTop: "5px" }}>
                <Col span={4} style={{ marginRight: "5px", marginLeft: "5px" }}>
                  <Tooltip title="Creative">
                    <Progress
                      strokeColor="#D2691E"
                      type="circle"
                      percent={this.props.eval[0] * 10}
                      format={(percent) => `${percent / 10}`}
                      width={60}
                    />
                  </Tooltip>
                </Col>
                <Col span={4} style={{ marginRight: "5px", marginLeft: "5px" }}>
                  <Tooltip title="Expressive">
                    <Progress
                      strokeColor="#FFD700"
                      type="circle"
                      percent={this.props.eval[1] * 10}
                      format={(percent) => `${percent / 10}`}
                      width={60}
                    />
                  </Tooltip>
                </Col>
                <Col span={4} style={{ marginRight: "5px", marginLeft: "5px" }}>
                  <Tooltip title="Quality">
                    <Progress
                      strokeColor="#1E90FF"
                      type="circle"
                      percent={this.props.eval[2] * 10}
                      format={(percent) => `${percent / 10}`}
                      width={60}
                    />
                  </Tooltip>
                </Col>
                <Col span={4} style={{ marginRight: "5px", marginLeft: "5px" }}>
                  <Tooltip title="Popularity">
                    <Progress
                      strokeColor="#0000CD"
                      type="circle"
                      percent={this.props.eval[3] * 10}
                      format={(percent) => `${percent / 10}`}
                      width={60}
                    />
                  </Tooltip>
                </Col>
                <Col span={4} style={{ marginRight: "5px", marginLeft: "5px" }}>
                  <Tooltip title="Workability">
                    <Progress
                      strokeColor="#98FB98"
                      type="circle"
                      percent={this.props.eval[4] * 10}
                      format={(percent) => `${percent / 10}`}
                      width={60}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </div>
        ) : (
          <div>
            {this.props.eval.length === 0 ? (
              <div></div>
            ) : (
              <div className="eval-detail">
                <div className="eval-devide">
                  <div className="eval-title">
                    <p>Creative </p>
                    <p>Expressive </p>
                    <p>Quality </p>
                    <p>Popularity </p>
                    <p>Workability </p>
                  </div>
                </div>
              </div>
            )}
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {},
                pageSize: 5,
              }}
              dataSource={this.props.eval}
              renderItem={(item) => (
                <div style={{ minWidth: "90vh" }}>
                  <Row>
                    <Col span={12}>
                      <Col>
                        <Avatar
                          style={{ marginRight: "20px" }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                        <Text strong>{item.username}</Text>
                      </Col>
                    </Col>
                    <Col span={12}>
                      <Row style={{ marginTop: "10px" }}>
                        <Col
                          span={4}
                          style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                          <Tooltip title="Creative">
                            <Progress
                              strokeColor="#D2691E"
                              type="circle"
                              percent={item.Creative * 10}
                              format={(percent) => `${percent / 10}`}
                              width={60}
                            />
                          </Tooltip>
                        </Col>
                        <Col
                          span={4}
                          style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                          <Tooltip title="Expressive">
                            <Progress
                              strokeColor="#FFD700"
                              type="circle"
                              percent={item.Expressive * 10}
                              format={(percent) => `${percent / 10}`}
                              width={60}
                            />
                          </Tooltip>
                        </Col>
                        <Col
                          span={4}
                          style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                          <Tooltip title="Quality">
                            <Progress
                              strokeColor="#1E90FF"
                              type="circle"
                              percent={item.Quality * 10}
                              format={(percent) => `${percent / 10}`}
                              width={60}
                            />
                          </Tooltip>
                        </Col>
                        <Col
                          span={4}
                          style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                          <Tooltip title="Popularity">
                            <Progress
                              strokeColor="#0000CD"
                              type="circle"
                              percent={item.Popularity * 10}
                              format={(percent) => `${percent / 10}`}
                              width={60}
                            />
                          </Tooltip>
                        </Col>
                        <Col
                          span={4}
                          style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                          <Tooltip title="Workability">
                            <Progress
                              strokeColor="#98FB98"
                              type="circle"
                              percent={item.Workability * 10}
                              format={(percent) => `${percent / 10}`}
                              width={60}
                            />
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Evaluation;
