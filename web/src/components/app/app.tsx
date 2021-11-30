import "./app.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Content from "../content/content";
import Sidebar from "../sidebar/sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
