import React from "react";
import { Card, Row } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SimilarImage extends React.Component {
  state = {
    similarImageList: null,
    referrer: null,
    loading: true,
  };

  componentDidMount() {
    this.getSimilarImage(this.props.imageId);
  }

  getSimilarImage(imageId) {
    axios
      .get("http://127.0.0.1:8000/similar-image/?imageId=" + imageId)
      .then((res) => {
        this.setState({
          similarImageList: res.data,
          loading: false,
        });
      });
  }

  handleChange(artifactId, e) {
    this.props.onChange(artifactId);
    console.log(artifactId);
  }

  handleCard(artifactId, e) {
    e.preventDefault();
    console.log(artifactId);
    let url = "/artifacts/" + artifactId;

    this.setState({ referrer: url });
  }

  similarImageResult = (imageList) => {
    return (
      <Row justify="space-around" align="middle" gutter={16}>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          imageList &&
          imageList.map((el, index) => (
            <Card
              onClick={(e) => this.handleChange(el.artifactId, e)}
              key={index}
              hoverable
              size="small"
              bordered={false}
              style={{
                width: "25%",
                height: "25%",
              }}
              cover={<img alt={index} src={el.image} />}
            ></Card>
          ))
        )}
      </Row>
    );
  };

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return this.similarImageResult(this.state.similarImageList);
  }
}

export default SimilarImage;
