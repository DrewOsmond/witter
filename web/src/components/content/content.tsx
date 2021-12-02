import "./content.css";
import { useState } from "react";
import Wit from "../wit/wit";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/reducers/session";

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

export default function Content() {
  const [text, setText] = useState("");
  const { user } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    if (e.target.value.length >= 140) return;
    setText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // const mockUser = {
  //   picture:
  //     "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
  //   username: "test123",
  // };

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
              placeholder="what's on your mind?"
              value={text}
              onChange={handleChange}
            />
          </div>
          <button
            className={`new__wit__button
                ${
                  text.length > 0
                    ? "new__wit__button__available"
                    : "new__wit__button__not__available"
                }
              `}
          >
            Wit
          </button>
        </div>
      )}
      <section>
        {mockWits.map((wit) => (
          <Wit wit={wit} key={wit.id} />
        ))}
      </section>
    </div>
  );
}
