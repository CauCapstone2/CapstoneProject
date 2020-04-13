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
  //   sourceData = props.data;
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={props.data.image} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={<a href={"/" + props.data.id}>{props.data.title}</a>}
        description={props.data.description}
      />
    </Card>
  );
};

export default Artifact;
