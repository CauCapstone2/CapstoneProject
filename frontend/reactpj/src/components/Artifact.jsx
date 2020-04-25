import React from "react";
import { Card, Avatar } from "antd";

const { Meta } = Card;

const Artifact = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 300, marginLeft : '10px', marginRight : '10px'}}
      cover={<img alt="example" src={props.data.image} />}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={props.data.title}
        description={props.data.description}
      />
    </Card>
  );
};

export default Artifact;