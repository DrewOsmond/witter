import "./content.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/reducers/session";
import { fetchFollowerWits } from "../../store/reducers/followerWits";
import { useEffect, useState } from "react";
import { likeWit, unlikeWit } from "../../store/reducers/session";
import { WitLike, Wit } from "../../types";

import NewWit from "../newwit/newWit";
import ListWits from "../listwit/listwit";

const Content = () => {
  const dispatch = useAppDispatch();
  const { likes, user } = useAppSelector((state) => state.session);

  const followerContent = useAppSelector((state) => state.followerContent);
  const wits: Wit[] = followerContent.wits;
  const [userLikes, setUserLikes] = useState(new Set());

  useEffect(() => {
    dispatch(fetchFollowerWits());
  }, [dispatch]);

  useEffect(() => {
    setUserLikes(new Set(likes));
  }, [likes, user]);

  const handleLikes = (wit: Wit, liked: boolean, setLikes: Function) => {
    console.log(liked);
    if (!liked) {
      //@ts-ignore
      dispatch(likeWit(wit));
      const newSet = new Set(likes);
      setUserLikes(newSet);

      setLikes([...wit.likes]);
    } else {
      //@ts-ignore
      dispatch(unlikeWit(wit));
      const newSet = new Set(likes);
      setUserLikes(newSet);
      setLikes(wit.likes.filter((lyk: WitLike) => lyk.userId !== user?.id));
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
            <ListWits
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
