import React from "react";
import { Card, Row } from "antd";
import { Redirect } from "react-router-dom";

class SimilarImage extends React.Component {
  state = {
    referrer: null,
  };

  handleChange(artifactId, e) {
    // let url = "/artifacts/" + artifactId;
    // this.props.onChange(url);
    // console.log(artifactId);
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
        {imageList &&
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
          ))}
      </Row>
    );
  };

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return this.similarImageResult(this.props.imageList);
  }
}

export default SimilarImage;
