import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { registerUser } from "../../store/reducers/session";

import "./register.css";

const Register = () => {
  const { user } = useAppSelector((state) => state.session);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // if (user) {
  //   navigate("/");
  // }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "username":
        return setUsername(value);
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      case "confirmPassword":
        return setConfirmPassword(value);
    }
  };

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const potentialErrors: string[] = [];

    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      potentialErrors.push("must be a valid email");
    }

    if (password !== confirmPassword) {
      potentialErrors.push("passwords do not match");
    }

    if (potentialErrors.length) return setErrors(potentialErrors);

    //@ts-ignore
    dispatch(
      //@ts-ignore
      registerUser({
        username,
        email,
        password,
      })
    );
  };

  return (
    <div className="register__login__page">
      {errors.length > 0 && errors.map((err, i) => <li key={i}>{err}</li>)}
      <form onSubmit={handleRegister} className="session__form">
        <label className="form__label" htmlFor="username">
          Username:
        </label>
        <input
          className="form__input"
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={handleChange}
          tabIndex={1}
        />

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className="form__input"
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
        />

        <label className="form__label" htmlFor="password">
          Password:
        </label>
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />

        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className="form__input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Create new account</button>
      </form>
    </div>
  );
};

export default Register;
