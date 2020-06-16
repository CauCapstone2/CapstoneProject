import React, { Component } from "react";
import axios from "axios";
import { Input, Row, Col, Pagination } from "antd";
import "../css/MainPage.css";
import Artifact from "../components/Artifact";
import { NavLink } from "react-router-dom";

const { Search } = Input;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  state = {
    keyword: "",
    artifact: [],
    pagination: {},
  };

  searchArtifactCall = async (keyword) => {
    axios.get("http://3.34.190.67/search?search=" + keyword).then((res) => {
      this.setState({
        keyword: keyword,
        artifact: res.data.results.reverse(),
        pagination: {
          count: res.data.count,
          prev: res.data.previous,
          next: res.data.next,
        },
      });
    });
  };

  onChange = (pageNumber) => {
    this.getSearchPage(this.state.keyword, pageNumber);
  };

  getSearchPage = async (keyword, page) => {
    let path =
      "http://3.34.190.67/search/?search=" + keyword + "&page=" + page;
    const res = await axios.get(path);
    this.setState({
      artifact: res.data.results.reverse(),
      pagination: {
        count: res.data.count,
        prev: res.data.previous,
        next: res.data.next,
      },
    });
  };

  render() {
    const { artifact, pagination } = this.state;
    return (
      <div
        align="middle"
        style={{ backgroundColor: "rgba(0,0,0,0.05)", minHeight: "87vh" }}
      >
        <Search
          placeholder="enter keywords to Search"
          onSearch={(value) => this.searchArtifactCall(value)}
          style={{ width: "50vh", marginTop: "5vh", marginBottom: "5vh" }}
          enterButton
        ></Search>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}>
          {artifact.map((artifact, index) => (
            <Col key={index} span={6}>
              <NavLink
                to={{ pathname: `/artifacts/${artifact.id}` }}
                style={{ color: "black" }}
              >
                <Artifact key={artifact.id} data={artifact} />
              </NavLink>
            </Col>
          ))}
        </Row>
        <Pagination
          size="small"
          total={pagination.count}
          pageSize={12}
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default SearchPage;
