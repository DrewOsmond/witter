import { ChangeEvent, SyntheticEvent, useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

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

    const fetchUser = await fetch("/api/session/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const response = await fetchUser.json();

    console.log(response);
  };

  return (
    <div>
      {errors.length > 0 && errors.map((err, i) => <li key={i}>{err}</li>)}
      <form onSubmit={handleRegister}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          value={username}
          onChange={handleChange}
        />

        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={handleChange}
        />

        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">confirm password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">register account</button>
      </form>
    </div>
  );
};

export default Register;
