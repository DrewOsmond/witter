import { FC } from "react";
import { Link } from "react-router-dom";

import "./wit.css";

import { Wits } from "../../types";

interface Props {
  wit: Wits;
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

      <div>
        <i className="fas fa-comments comment__wit"></i>
        <i className="far fa-heart like__wit"></i>
      </div>
    </div>
  );
};

export default Wit;
