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
  // console.log(replies); //fix an issue where replies.length crashes the app

  return (
    <div className="wit">
      <Link to={`/${user.username}`}>
        <div className="wit__username">{user.username}</div>
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
          {/* <div className="wit__replies__length">{replies.length}</div> */}
        </div>
        <i
          className={liked ? "fas fa-heart" : "far fa-heart"}
          onClick={() => handleLikes(wit, liked)}
        ></i>
      </div>
    </div>
  );
};

export default ListWits;
