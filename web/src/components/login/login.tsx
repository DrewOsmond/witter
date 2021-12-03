import { SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/reducers/session";

import "../register/register.css";

interface LoginInfo {
  password: string;
  username?: string;
  email?: string;
}

const Login = () => {
  const session = useAppSelector((state) => state.session);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = session.user;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handeLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    const loginInfo = { password } as LoginInfo;

    if (!password.length || !credential.length) {
      setErrors(["username, email, or password must not be blank."]);
    }

    if (
      credential
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      loginInfo.email = credential;
    } else {
      loginInfo.username = credential;
    }
    //@ts-ignore
    dispatch(loginUser(loginInfo));
  };

  return (
    <div className="register__login__page">
      {errors.length > 0 && errors.map((err, i) => <li key={i}>{err}</li>)}
      <form onSubmit={handeLogin} className="session__form">
        <label className="form__label" htmlFor="credentials">
          Username or Email:
        </label>
        <input
          className="form__input"
          type="text"
          name="credentials"
          placeholder="Username or Email"
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />

        <label className="form__label" htmlFor="password">
          Password:
        </label>
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
