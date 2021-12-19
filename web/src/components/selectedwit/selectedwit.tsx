import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./selectedwit.css";

const SelectedWit = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.session);
  const [comment, setComment] = useState("");
  console.log(location.state);
  const [wit, setWit] = useState(
    location.state?.wit ? location.state.wit : null
  );

  const [liked, setLiked] = useState(location.state?.liked ? true : false);

  useEffect(() => {
    if (!wit) {
      (async () => {
        const { data } = await axios.get(`/api/wit/${id}`);

        setWit(data);
      })();
    }
  }, []);

  if (!wit) {
    return null;
  } else {
    const { user, content, image, replies } = wit;
    console.log(wit);
    return (
      <>
        <div className="content__page">
          <div className="selected-wit">
            <Link to={`/${user.username}`}>
              <div className="selected-wit__username">{user.username}</div>
            </Link>
            <div>{content}</div>
            {image ? <img src={image} alt="users post" /> : null}
          </div>
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
      </>
    );
  }
};

export default SelectedWit;
