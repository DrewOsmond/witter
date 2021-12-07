import "./content.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/reducers/session";
import NewWit from "../newWit/newWit";
import Wit from "../wit/wit";
import { fetchFollowerWits } from "../../store/reducers/followerWits";
import { useEffect } from "react";

import { Wits } from "../../types";

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
