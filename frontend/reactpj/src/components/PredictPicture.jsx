import React from "react";
import { Image } from "react-bootstrap";

class PredictPicture extends React.Component {
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

  predictResult = (predict, image) => {
    switch (predict) {
      case 0:
        return this.resultContent(image, "Byzantine", "abcdef");
      case 1:
        return this.resultContent(image, "Romanesque", "abcd");
      case 2:
        return this.resultContent(image, "Renaissance", "abcd");
      case 3:
        return this.resultContent(image, "Mannerism ", "abcd");
      case 4:
        return this.resultContent(image, "Rococo", "abcdefghijk");
      case 5:
        return this.resultContent(image, "Neoclassicism", "abcd");
      case 6:
        return this.resultContent(image, "Romanticism", "abcd");
      case 7:
        return this.resultContent(image, "Modern", "abcdefghijklm");
      case 8:
        return this.resultContent(image, "Surrealism", "abcd");
      case 9:
        return this.resultContent(image, "postmodern", "abcd");
      case 10:
        return this.resultContent(image, "Pop", "abcdefghijk");
      case 11:
        return this.resultContent(image, "Kinetic", "abcdefg");
      case 12:
        return this.resultContent(image, "Baroque", "abcdefg");
      default:
        return <div>error</div>;
    }
  };

  render() {
    return this.predictResult(this.props.predict, this.props.previewImage);
  }
}

export default PredictPicture;
