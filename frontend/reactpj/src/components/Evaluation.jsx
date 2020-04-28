import React, { Component } from 'react';
import { List } from 'antd';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Evaluation extends Component {
    render() {
        return (
            <div>
                <div className="evaluation-header"><h2>Evaluation</h2></div>
                <List itemLayout="vertical" size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.props.eval}
                    renderItem={item => (
                        <List.Item>
                            <div className="eval-container">
                                <div className="eval-info"><p className="eval-username">{item.username}</p></div>
                                <div className="eval-scores">
                                    <div style={{ width: 100, height: 100 }}>
                                        <CircularProgressbar value={item.Creative} text={item.Creative} maxValue={10} styles={buildStyles({
                                            trailColor: '#e6f2ff',
                                        })} />
                                    </div>
                                    <div style={{ width: 100, height: 100 }}>
                                        <CircularProgressbar value={item.Expressive} text={item.Expressive} maxValue={10} styles={buildStyles({
                                            trailColor: '#ffe6e6',
                                            textColor: '#f88',
                                            pathColor: `rgba(255, 77, 77, ${item.Expressive / 10})`,
                                        })} />
                                    </div>
                                    <div style={{ width: 100, height: 100 }}>
                                        <CircularProgressbar value={item.Quality} text={item.Quality} maxValue={10} styles={buildStyles({
                                            trailColor: '#e6ffe6',
                                            textColor: '#00cc00',
                                            pathColor: `rgba(0, 255, 0, ${item.Quality / 10})`,
                                        })} />
                                    </div>
                                    <div style={{ width: 100, height: 100 }}>
                                        <CircularProgressbar value={item.Popularity} text={item.Popularity} maxValue={10} styles={buildStyles({
                                            trailColor: 'fff7e6',
                                            textColor: '#ffcc00',
                                            pathColor: `rgba(255, 219, 77, ${item.Quality / 10})`,
                                        })} />
                                    </div>
                                    <div style={{ width: 100, height: 100 }}>
                                        <CircularProgressbar value={item.Workability} text={item.Workability} maxValue={10} styles={buildStyles({
                                            trailColor: '#f7e6ff',
                                            textColor: '#aa00ff',
                                            pathColor: `rgba(204, 102, 255, ${item.Quality / 10})`,
                                        })} />
                                    </div>
                                </div>
                                <div className="eval-totalbox"><p className="eval-total">{(item.Creative + item.Expressive + item.Quality + item.Popularity + item.Workability) / 5}</p></div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Evaluation;