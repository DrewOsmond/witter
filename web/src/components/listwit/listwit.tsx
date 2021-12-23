import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { Wit, Reply, User } from "../../types";

import "./listwit.css";

interface Props {
  wit?: Wit;
  reply?: Reply;
  liked: boolean;
  handleLikes: Function;
}

interface Data {
  user: User;
  content: String;
  likez: [];
  replies: [];
  image?: String;
}

const ListWits: FC<Props> = ({ wit, liked, handleLikes, reply }) => {
  // const { user, content, image, replies } = wit;
  const data = {
    user: wit ? wit.user : reply?.user,
    content: wit ? wit.content : reply?.content,
    likez: wit ? wit.likes : reply?.likes,
    replies: wit ? wit.replies : reply?.replies,
    image: wit
      ? wit.image
        ? wit.image
        : null
      : reply?.image
      ? reply.image
      : null,
    // likes: wit ? wit.likes :
  };
  const { user, content, image, replies, likez } = data;
  const [displayComments, setDisplayComments] = useState("far");
  const [likes, setLikes] = useState(likez);

  return (
    <div className="wit">
      <Link to={`/${user?.username}`} className="wit__username">
        {user?.username}
      </Link>
      <Link
        className="wit__clickable"
        to={`/wit/${wit?.id}`}
        state={{ wit, liked }}
      >
        <div>{content}</div>
        {image ? <img src={`${image}`} alt="post" /> : null}
      </Link>
      <div className="comments__like">
        <div className="wit__comments">
          <i
            onMouseOverCapture={() => setDisplayComments("fas")}
            onMouseOut={() => setDisplayComments("far")}
            className={`${displayComments} fa-comments`}
          ></i>
          <div className="wit__replies__length">
            {replies && replies.length > 0 ? replies?.length : ""}
          </div>
        </div>

        <div className="wit__likes">
          <i
            className={liked ? "fas fa-heart" : "far fa-heart"}
            onClick={() => handleLikes(wit ? wit : reply, liked, setLikes)}
          ></i>
          <div className="wit__likes__length">
            {likes && likes.length > 0 ? likes.length : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWits;
