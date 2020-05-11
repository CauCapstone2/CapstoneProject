import React, { Component } from 'react';
import axios from 'axios';
import { Input, Row, Col } from 'antd';
import '../css/MainPage.css';
import { connect } from 'react-redux';
import Artifact from '../components/Artifact';
import { NavLink } from 'react-router-dom';

const { Search } = Input;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  state = {
    artifact: [],
  }

  searchArtifactCall = async (keyword) => {
    axios.get('http://127.0.0.1:8000/search?search=' + keyword)
      .then(res => {
        this.setState({
          artifact: res.data
        });
      })
  }

  render() {
    const { artifact } = this.state;
    return (
      <div align = 'middle' style={{ backgroundColor: 'rgba(0,0,0,0.05)', minHeight: '87vh' }}>
        <Search placeholder="enter keywords to Search"
          onSearch={value => this.searchArtifactCall(value)}
          style={{ width: '30vh', marginTop: '5vh', marginBottom: '5vh' }}
          enterButton>
        </Search>
        {/* <ArtifactList data = '4'></ArtifactList> */}
        {/* <Row justify = 'center' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}> */}
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]} >
            {artifact.map((artifact, index) => (
              <Col key={index} span={6}>
                <NavLink to={{ pathname: `/artifacts/${artifact.id}` }} style={{ color: 'black' }}>
                  <Artifact key={artifact.id} data={artifact} />
                </NavLink>
              </Col>
            ))}
          </Row>
        {/* </Row> */}
      </div>
    );
  }
}
export default SearchPage;