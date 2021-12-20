import { FC } from "react";
import { Link } from "react-router-dom";
import { WitReply } from "../../types";

interface Props {
  reply: WitReply;
}

const Reply: FC<Props> = ({ reply }) => {
  const { content, user, likes, createdAt } = reply;
  const { username, picture } = user;

  return (
    <div>
      <Link to={`/${username}`}>{username}</Link>
    </div>
  );
};

export default Reply;
