import React from "react";

import { Card, Carousel, List, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const Artifact = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 300, margin: 10 }}
      cover={<img alt="example" src={props.data.image} />}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={<a href={"/artifacts/" + props.data.id}>{props.data.title}</a>}
        description={props.data.description}
      />
    </Card>
  );
};

export default Artifact;
