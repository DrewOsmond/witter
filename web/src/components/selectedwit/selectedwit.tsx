import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { WitReply } from "../../types";
import axios from "axios";
import "./selectedwit.css";

import Reply from "../reply/reply";

const SelectedWit = () => {
  const dispatch = useAppDispatch();
  const { user, likes } = useAppSelector((state) => state.session);
  const location = useLocation();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(location.state?.liked ? true : undefined);
  const [wit, setWit] = useState(
    location.state?.wit ? location.state.wit : null
  );

  useEffect(() => {
    if (!wit) {
      (async () => {
        const { data } = await axios.get(`/api/wit/${id}`);

        setLiked(likes.includes(Number(id)));
        setWit(data);
      })();
    }
  }, []);

  const handleChange = (e: any) => {
    if (e.target.value.length >= 140) return;
    setText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
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
                  // onClick={handleSubmit}
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
          {replies.length > 0 &&
            replies.map((comment: WitReply) => <Reply reply={comment} />)}
        </div>
      </>
    );
  }
};

export default SelectedWit;
