import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addWit } from "../../store/reducers/followerWits";
import axios from "axios";

const NewWit = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const { user } = useAppSelector((state) => state.session);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    if (e.target.value.length >= 140) return;
    setText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    if (!text) return;
    await axios
      .post("/api/wit/create", { content: text })
      .then(({ data }) => {
        dispatch(addWit(data));
        setText("");
      })
      .catch((e) => {
        setError("something went wrong");
      });
  };

  return (
    <>
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
          {error.length > 0 && <div>{error}</div>}
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
            Wit
          </button>
        </div>
      )}
    </>
  );
};

export default NewWit;
