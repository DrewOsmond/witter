import { FC } from "react";

interface Props {
  reply: {};
}

const Reply: FC<Props> = ({ reply }) => {
  console.log(reply);
  return <div></div>;
};

export default Reply;
