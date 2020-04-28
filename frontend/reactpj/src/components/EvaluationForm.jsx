import React, { Component } from 'react';
import axios from 'axios';
import { Button, InputNumber } from 'antd';

class EvaluationForm extends Component {
    state = {
        creative: null,
        expressive: null,
        quality: null,
        popularity: null,
        workability: null,
    }

    handleSubmitEval = async () => {
        console.log(this.state);
        await axios.post('http://127.0.0.1:8000/evaluation/api/', {
            userID: this.props.userid,
            Creative: this.state.creative,
            Expressive: this.state.expressive,
            Quality: this.state.quality,
            Popularity: this.state.popularity,
            Workability: this.state.workability,
            artifactID: this.props.artifactID,
        }).then(res => console.log(res)).catch(error => console.error(error));
    }

    handleUpdateEval = async () => {
        console.log(this.props.preEval.id);
        await axios.patch('http://127.0.0.1:8000/evaluation/api/' + this.props.preEval.id + '/', {
            Creative: this.state.creative,
            Expressive: this.state.expressive,
            Quality: this.state.quality,
            Popularity: this.state.popularity,
            Workability: this.state.workability,
        }).then(res => console.log(res)).catch(error => console.error(error));
    }

    onChangeCreative = (value) => {
        this.state.creative = value;
    }
    onChangeExpressive = (value) => {
        this.state.expressive = value;
    }
    onChangeQuality = (value) => {
        this.state.quality = value;
    }
    onChangePopularity = (value) => {
        this.state.popularity = value;
    }
    onChangeWorkability = (value) => {
        this.state.workability = value;
    }

    render() {
        return this.props.preEval ? (
            <div className="eval-input">
                <p>Creative : <InputNumber min={0} max={10} onChange={this.onChangeCreative} /></p>
                <p>Expressive : <InputNumber min={0} max={10} onChange={this.onChangeExpressive} /></p>
                <p>Quality : <InputNumber min={0} max={10} onChange={this.onChangeQuality} /></p>
                <p>Popularity : <InputNumber min={0} max={10} onChange={this.onChangePopularity} /></p>
                <p>Workability : <InputNumber min={0} max={10} onChange={this.onChangeWorkability} /></p>
                <Button type="primary" onClick={this.handleUpdateEval}>Update</Button>
            </div>
        ) : (
            <div className="eval-input">
                <p>Creative : <InputNumber min={0} max={10} onChange={this.onChangeCreative} /></p>
                <p>Expressive : <InputNumber min={0} max={10} onChange={this.onChangeExpressive} /></p>
                <p>Quality : <InputNumber min={0} max={10} onChange={this.onChangeQuality} /></p>
                <p>Popularity : <InputNumber min={0} max={10} onChange={this.onChangePopularity} /></p>
                <p>Workability : <InputNumber min={0} max={10} onChange={this.onChangeWorkability} /></p>
                <Button type="primary" onClick={this.handleSubmitEval}>Evaluate</Button>
            </div>
            )
    }
}

export default EvaluationForm;