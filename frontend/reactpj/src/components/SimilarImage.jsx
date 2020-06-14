import React from "react";
import { Card, Row } from "antd";

class SimilarImage extends React.Component {
  handleChange(artifactId, e) {
    this.props.onChange(artifactId);
  }

  similarImageResult = (imageList) => {
    if (this.props.isLoading) return <div>Loading...</div>;
    return (
      <Row justify="center" align="middle">
        {imageList &&
          imageList.map((el, index) => (
            <Card
              key={index}
              onClick={(e) => this.handleChange(el.artifactId, e)}
              hoverable
              size="small"
              bordered={false}
              bodyStyle={{
                padding: "0px",
              }}
              style={{
                width: "20%",
                height: "20%",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                justify: "center",
                align: "middle",
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
