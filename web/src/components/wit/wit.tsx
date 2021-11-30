import { FC } from "react";
import { Link } from "react-router-dom";

import "./wit.css";

interface Props {
  wit: {
    user: {
      username: string;
      picture: string | null;
    };
    content: string;
    image: string | null;
  };
}

const Wit: FC<Props> = ({ wit }) => {
  const { user, content, image } = wit;
  return (
    <div className="wit">
      <Link to={`/${user.username}`}>
        <div className="wit__username">{user.username}</div>
      </Link>
      <div>{content}</div>
      {image ? <img src={image} alt="post" /> : null}
    </div>
  );
};

export default Wit;
