import { FC, useState } from "react";
import { Link } from "react-router-dom";

import "./wit.css";

import { Wits } from "../../types";

interface Props {
  wit: Wits;
}

const Wit: FC<Props> = ({ wit }) => {
  const { user, content, image, replies } = wit;
  const [displayHeart, setDisplayHeart] = useState("far");
  const [displayComments, setDisplayComments] = useState("far");

  return (
    <div className="wit">
      <Link to={`/${user.username}`}>
        <div className="wit__username">{user.username}</div>
      </Link>
      <div>{content}</div>
      {image ? <img src={image} alt="post" /> : null}

      <div className="comments__like">
        <div className="wit__comments">
          <i
            onMouseOverCapture={() => setDisplayComments("fas")}
            onMouseOut={() => setDisplayComments("far")}
            className={`${displayComments} fa-comments`}
          ></i>
          <div className="wit__replies__length">{replies.length}</div>
        </div>
        <i
          onMouseOverCapture={() => setDisplayHeart("fas")}
          onMouseOut={() => setDisplayHeart("far")}
          className={`${displayHeart} fa-heart`}
        ></i>
      </div>
    </div>
  );
};

export default Wit;
