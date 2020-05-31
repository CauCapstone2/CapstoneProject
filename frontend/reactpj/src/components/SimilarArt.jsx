import React from "react";
import axios from "axios";
import { Image } from "react-bootstrap";

class SimilarArt extends React.Component {
  state = {
    similarImageList: [],
  };

  componentDidMount() {
    const imageId = this.props.imageId;
    console.log(this.props.imageId);
    // axios
    //   .get("http://127.0.0.1:8000/similar-art/?imageId=" + imageId)
    //   .then((res) => {
    //     this.setState({ similarImageList: res.data });
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }

  resultContent = (image, artAge, content) => {
    return (
      <div>
        <Image
          className="art"
          style={{ width: "100%", height: "100%" }}
          src={image}
        ></Image>
        <h1>{artAge}</h1>
        <p>{content}</p>
      </div>
    );
  };

  predictResult = (predict, image) => {};

  render() {
    return <div>{this.props.imageId}</div>;
  }
}

export default SimilarArt;
