import React from "react";
import { Image } from "react-bootstrap";
import { Card, Row, Col } from "antd";

class SimilarImage extends React.Component {
  similarImageResult = (imageList) => {
    return (
      // <div>
      <Row justify="space-around" align="middle" gutter={16}>
        {imageList &&
          imageList.map((el, index) => (
            // <div className="art-box" key={index}>
            <Card
              key={index}
              hoverable
              size="small"
              bordered={false}
              style={{ width: "25%", height: "25%" }}
              cover={<img alt={index} src={el.image} />}
            ></Card>
            // <Image
            //   className="art"
            //   style={{ width: "30%", height: "30%" }}
            //   src={el.image}
            // />
            // </div>
          ))}
        {/* </div> */}
      </Row>
    );
  };

  render() {
    return this.similarImageResult(this.props.imageList);
  }
}

export default SimilarImage;
