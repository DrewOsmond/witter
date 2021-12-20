import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { restoreUser } from "./store/reducers/session";
import { useAppSelector, useAppDispatch } from "./store/hooks";

import Content from "./components/content/content";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Register from "./components/register/register";
import Profile from "./components/profile/profile";
import Login from "./components/login/login";
import SelectedWit from "./components/selectedwit/selectedwit";

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
