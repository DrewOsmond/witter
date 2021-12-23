import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addComment } from "../../store/reducers/followerWits";
import { likeReply, unlikeReply } from "../../store/reducers/session";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Reply, ReplyLike, WitReply } from "../../types";
import axios from "axios";

import ListWits from "../listwit/listwit";

const SelectedWit = () => {
  const dispatch = useAppDispatch();
  const { user, likes, replyLikes } = useAppSelector((state) => state.session);
  const location = useLocation();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(location.state?.liked ? true : undefined);
  const [wit, setWit] = useState(
    location.state?.wit ? location.state.wit : null
  );

  const [replyLikez, setReplyLikez] = useState(new Set(replyLikes));
  console.log(replyLikes);
  useEffect(() => {
    if (!wit) {
      (async () => {
        const { data } = await axios.get(`/api/wit/${id}`);
        setLiked(likes.includes(Number(id)));
        setWit(data[0]);
      })();
    }

    if (!user) {
      return;
    }
  }, []);

  useEffect(() => {
    setReplyLikez(new Set(replyLikes));
  }, [replyLikes, user]);

  const handleChange = (e: any) => {
    if (e.target.value.length >= 140) return;
    setText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    const { data } = await axios.post("/api/reply/create", {
      content: text,
      witId: wit.id,
    });
    dispatch(addComment({ comment: data, wit }));
    setText("");
    wit.replies.push(data);
    setWit({ ...wit });
  };

  const handleReplyLike = (
    reply: Reply,
    liked: boolean,
    setLikes: Function
  ) => {
    if (!liked) {
      dispatch(likeReply(reply));
      setLikes((prev: []) => [
        ...prev,
        { replyId: reply.id, userId: user?.id },
      ]);
    } else {
      dispatch(unlikeReply(reply));
      setLikes((prev: ReplyLike[]) =>
        prev.filter((lyk) => lyk.userId !== user?.id)
      );
    }
  };

  if (!wit) {
    return null;
  } else {
    const { user, content, image, replies } = wit;

    return (
      <>
        <div className="content__page selected__wit">
          <div className="wit">
            <Link to={`/${user.username}`} className="wit__username">
              {user.username}
            </Link>
            <div>{content}</div>
            {image ? <img src={image} alt="users post" /> : null}
            <div className="comments__like">
              <div className="wit__comments">
                <i className="fas fa-comments"></i>
                {/* <div className="wit__replies__length">{replies.length}</div> */}
              </div>
              <i
                className={liked ? "fas fa-heart" : "far fa-heart"}
                // onClick={() => handleLikes(wit, liked)}
              ></i>
            </div>
          </div>
          <div>
            {user && (
              <div className="new__wit">
                <div className="new__wit__upper">
                  {user.picture ? (
                    <img
                      className="new__wit__picture"
                      src={user.picture}
                      alt="users profile"
                    />
                  ) : (
                    <div className="new__wit__default__picture">
                      <i className="fas fa-user"></i>
                    </div>
                  )}

                  <textarea
                    className="new__wit__text"
                    cols={50}
                    rows={4}
                    placeholder="big brain your reply"
                    value={text}
                    onChange={handleChange}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className={`new__wit__button
                ${
                  text.length > 0
                    ? "new__wit__button__available"
                    : "new__wit__button__not__available"
                }
                `}
                >
                  reply
                </button>
              </div>
            )}
          </div>
          {replies &&
            replies.map((comment: WitReply) => (
              <ListWits
                reply={comment}
                key={`reply-${comment.id}`}
                liked={replyLikez.has(Number(comment.id))}
                //@ts-ignore
                handleLikes={handleReplyLike}
              />
            ))}
        </div>
      </>
    );
  }
};

export default SelectedWit;
