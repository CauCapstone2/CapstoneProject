import React from "react";
import { Card, Avatar, Typography } from "antd";
const { Paragraph } = Typography;
const { Meta } = Card;

const Artifact = (props) => {
  let additional = "edited by " + props.data.username;
  return (
    <Card
      hoverable
      style={{ width: 300, marginLeft: "10px", marginRight: "10px" }}
      cover={<img alt="example" src={props.data.image} />}
    >
      <Meta
        title={props.data.title}
        description={[
          <Paragraph
            key={props.data.id}
            ellipsis={{ rows: 2, expandable: false }}
          >
            {props.data.description}
          </Paragraph>,
          additional,
        ]}
      />
    </Card>
  );
};

export default Artifact;
