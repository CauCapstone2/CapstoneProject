import React, { Component } from "react";
import { List, Col, Row, Tooltip, Progress, Avatar, Typography } from "antd";
import "react-circular-progressbar/dist/styles.css";

const { Text } = Typography;

class Evaluation extends Component {
  render() {
    return (
      <div>
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
            // <List.Item>
            //     <div className="eval-container">
            //         <div className="eval-info"><p className="eval-username">{item.username}</p></div>
            //         <div className="eval-scores">
            //             <div className="tooltip" style={{ width: 100, height: 100 }}>
            //                 <CircularProgressbar value={item.Creative} text={item.Creative} maxValue={10} styles={buildStyles({
            //                     trailColor: '#e6f2ff',
            //                 })} />
            //                 <div className="box-tooltip">
            //                     <div className="tooltip-text">Creative</div>
            //                 </div>
            //             </div>
            //             <div className="tooltip" style={{ width: 100, height: 100 }}>
            //                 <CircularProgressbar value={item.Expressive} text={item.Expressive} maxValue={10} styles={buildStyles({
            //                     trailColor: '#ffe6e6',
            //                     textColor: '#f88',
            //                     pathColor: `rgba(255, 77, 77, ${item.Expressive / 10})`,
            //                 })} />
            //                 <div className="box-tooltip">
            //                     <div className="tooltip-text">Expressive</div>
            //                 </div>
            //             </div>
            //             <div className="tooltip" style={{ width: 100, height: 100 }}>
            //                 <CircularProgressbar value={item.Quality} text={item.Quality} maxValue={10} styles={buildStyles({
            //                     trailColor: '#e6ffe6',
            //                     textColor: '#00cc00',
            //                     pathColor: `rgba(0, 255, 0, ${item.Quality / 10})`,
            //                 })} />
            //                 <div className="box-tooltip">
            //                     <div className="tooltip-text">Quality</div>
            //                 </div>
            //             </div>
            //             <div className="tooltip" style={{ width: 100, height: 100 }}>
            //                 <CircularProgressbar value={item.Popularity} text={item.Popularity} maxValue={10} styles={buildStyles({
            //                     trailColor: 'fff7e6',
            //                     textColor: '#ffcc00',
            //                     pathColor: `rgba(255, 219, 77, ${item.Quality / 10})`,
            //                 })} />
            //                 <div className="box-tooltip">
            //                     <div className="tooltip-text">Popularity</div>
            //                 </div>
            //             </div>
            //             <div className="tooltip" style={{ width: 100, height: 100 }}>
            //                 <CircularProgressbar value={item.Workability} text={item.Workability} maxValue={10} styles={buildStyles({
            //                     trailColor: '#f7e6ff',
            //                     textColor: '#aa00ff',
            //                     pathColor: `rgba(204, 102, 255, ${item.Quality / 10})`,
            //                 })} />
            //                 <div className="box-tooltip">
            //                     <div className="tooltip-text">Workability</div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="eval-totalbox"><p className="eval-total">{(item.Creative + item.Expressive + item.Quality + item.Popularity + item.Workability) / 5}</p></div>
            //     </div>
            // </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Evaluation;
