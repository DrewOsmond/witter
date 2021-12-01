import "./app.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Content from "../content/content";
import Sidebar from "../sidebar/sidebar";
import Register from "../register/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
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
    </>
  );
}

export default App;
