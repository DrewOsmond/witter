import "./app.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { restoreUser } from "../../store/reducers/session";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import Content from "../content/content";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Register from "../register/register";
import Profile from "../profile/profile";
import Login from "../login/login";
import { SelectedWit } from "../wit/wit";

function App() {
  const { user } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
    // return <div>loading..</div>;
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" />
        {user && (
          <>
            <Route path="/" element={<Content />} />
            <Route path="/wit/:id" element={<SelectedWit />} />
          </>
        )}
        <Route path="/:user" element={<Profile />} />
      </Routes>
      {user && <Sidebar />}

      {!user && <Login />}
    </>
  );
}

export default App;
