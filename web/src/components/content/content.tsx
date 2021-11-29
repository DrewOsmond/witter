import "./content.css";
import { useState } from "react";

export default function Content() {
  const [text, setText] = useState("");

  const handleChange = (e: any) => {
    if (e.target.value.length >= 140) return;
    setText(e.target.value);
  };

  const mockUser = {
    picture:
      "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    username: "test123",
  };

  return (
    <div className="content__page">
      <header className="content__page__banner">
        <h1>Witter</h1>
      </header>
      {mockUser && (
        <div className="wit">
          <div className="wit__upper">
            {mockUser.picture ? (
              <img
                className="wit__picture"
                src={mockUser.picture}
                alt="users profile"
              />
            ) : null}

            <textarea
              className="wit__text"
              cols={50}
              rows={4}
              placeholder="what's on your mind?"
              value={text}
              onChange={handleChange}
            />
          </div>
          <button
            className={`wit__button
                ${
                  text.length > 0
                    ? "wit__button__available"
                    : "wit__button__not__available"
                }
              `}
          >
            Wit
          </button>
        </div>
      )}
      <section>{/*add wits here */}</section>
    </div>
  );
}
