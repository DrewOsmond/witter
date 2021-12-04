import "./content.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/reducers/session";
import NewWit from "../newWit/newWit";
import Wit from "../wit/wit";
import { fetchFollowerWits } from "../../store/reducers/followerWits";
import { useEffect } from "react";

import { Wits } from "../../types";

const mockWits = [
  {
    id: 1,
    user: {
      username: "test123",
      picture: null,
    },
    content: "weeeee poggers",
    image: null,
  },
  {
    id: 2,
    user: {
      username: "bubblebop",
      picture: null,
    },
    content:
      "I freaking love arcane, the show is really good and it just works so well. Really well made, super cool characters. Can't wait for ezreal's character to show up!!!!",
    image: null,
  },
];

const Content = () => {
  const dispatch = useAppDispatch();
  const followerContent = useAppSelector((state) => state.followerContent);
  const wits: Wits[] = followerContent.wits;
  useEffect(() => {
    dispatch(fetchFollowerWits());
  }, []);

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
        {wits.length > 0 && wits?.map((wit) => <Wit wit={wit} key={wit.id} />)}
      </section>
    </div>
  );
};

export default Content;
