import "./app.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { restoreUser } from "../../store/reducers/session";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import Content from "../content/content";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Register from "../register/register";
import Profile from "../profile/profile";

function App() {
  const { user } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      {user && (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/:user" element={<Profile />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Content />
                <Sidebar />
              </>
            }
          />
        </Routes>
      )}

      {!user && <Register />}
    </>
  );
}

export default App;
