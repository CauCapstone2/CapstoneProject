import React from "react";
import { Image } from "react-bootstrap";

class PredictPicture extends React.Component {
  resultContent = (image, artAge, content) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          className="art"
          style={{ width: "60%", height: "60%" }}
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
        return this.resultContent(image, "Byzantine", "수백년전 느낌 그대로...");
      case 1:
        return this.resultContent(image, "Romanesque", "로마네스크! 고대의 기억~");
      case 2:
        return this.resultContent(image, "Renaissance", "그 유명한 모나리자가 르네상스때 그려졌죠?");
      case 3:
        return this.resultContent(image, "Mannerism ", "500년 전에는 개성적인 그림이었대요!");
      case 4:
        return this.resultContent(image, "Rococo", "화려함의 극치!");
      case 5:
        return this.resultContent(image, "Neoclassicism", "300년 전의 감각 그대로...");
      case 6:
        return this.resultContent(image, "Romanticism", "너무 낭만적이지 않나요?");
      case 7:
        return this.resultContent(image, "Modern", "오! 슬슬 21세기로 오고 있어요!");
      case 8:
        return this.resultContent(image, "Surrealism", "초초초현실주의...피카..소?");
      case 9:
        return this.resultContent(image, "postmodern", "현대적이군요~무난하네요");
      case 10:
        return this.resultContent(
          image,
          "Pop",
          "오 팝아트~당신은 앤디워홀의 후계자인가요?!"
        );
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
