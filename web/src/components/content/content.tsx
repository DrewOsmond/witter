import "./content.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/reducers/session";
import NewWit from "../newWit/newWit";
import WitComponent from "../wit/wit";
import { fetchFollowerWits } from "../../store/reducers/followerWits";
import { useEffect, useState } from "react";
import { likeWit, unlikeWit } from "../../store/reducers/session";
import { Wit } from "../../types";

const Content = () => {
  const dispatch = useAppDispatch();
  const { likes } = useAppSelector((state) => state.session);

  const followerContent = useAppSelector((state) => state.followerContent);
  const wits: Wit[] = followerContent.wits;
  // const userLikes = new Set(likes);
  const [userLikes, setUserLikes] = useState(new Set());

  useEffect(() => {
    const userLikes = new Set();

    dispatch(fetchFollowerWits());

    for (let like of likes) {
      userLikes.add(like.witId);
    }

    setUserLikes(userLikes);
  }, []);

  const handleLikes = (wit: Wit, liked: boolean) => {
    if (!liked) {
      //@ts-ignore
      dispatch(likeWit(wit));
      userLikes.add(wit.id);
      const newSet = new Set(userLikes);
      setUserLikes(newSet);
    } else {
      //@ts-ignore
      dispatch(unlikeWit(wit));
      userLikes.delete(wit.id);
      const newSet = new Set(userLikes);
      setUserLikes(newSet);
    }
  };

  return (
    <div className="content__page">
      <button
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        logout
      </button>
      <header className="content__page__banner">
        <h1>Witter</h1>
      </header>
      <NewWit />
      <section>
        {wits.length > 0 &&
          wits?.map((wit) => (
            <WitComponent
              wit={wit}
              liked={userLikes.has(wit.id)}
              key={wit.id}
              handleLikes={handleLikes}
            />
          ))}
      </section>
    </div>
  );
};

export default Content;
