import React from "react";
import { Card, Row } from "antd";

class SimilarImage extends React.Component {
  handleChange(artifactId, e) {
    this.props.onChange(artifactId);
  }

  similarImageResult = (imageList) => {
    if (this.props.isLoading) return <div>Loading...</div>;
    return (
      <Row justify="space-around" align="middle" gutter={16}>
        {imageList &&
          imageList.map((el, index) => (
            <Card
              key={index}
              onClick={(e) => this.handleChange(el.artifactId, e)}
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
    return this.similarImageResult(this.props.imageList);
  }
}

export default SimilarImage;
