import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { Wit } from "../../types";

import "./listwit.css";

interface Props {
  wit: Wit;
  liked: boolean;
  handleLikes: Function;
}

const ListWits: FC<Props> = ({ wit, liked, handleLikes }) => {
  const { user, content, image, replies } = wit;
  const [displayComments, setDisplayComments] = useState("far");
  const [likes, setLikes] = useState(wit.likes);
  if (wit.id == 1) {
    // console.log(likes);
    // console.log(wit.likes);
  }
  return (
    <div className="wit">
      <Link to={`/${user.username}`} className="wit__username">
        {user.username}
      </Link>
      <Link
        className="wit__clickable"
        to={`/wit/${wit.id}`}
        state={{ wit, liked }}
      >
        <div>{content}</div>
        {image ? <img src={image} alt="post" /> : null}
      </Link>
      <div className="comments__like">
        <div className="wit__comments">
          <i
            onMouseOverCapture={() => setDisplayComments("fas")}
            onMouseOut={() => setDisplayComments("far")}
            className={`${displayComments} fa-comments`}
          ></i>
          <div className="wit__replies__length">
            {replies.length > 0 ? replies.length : ""}
          </div>
        </div>

        <div className="wit__likes">
          <i
            className={liked ? "fas fa-heart" : "far fa-heart"}
            onClick={() => handleLikes(wit, liked, setLikes)}
          ></i>
          <div className="wit__likes__length">
            {likes.length > 0 ? likes.length : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWits;
