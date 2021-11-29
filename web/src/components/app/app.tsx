import "./app.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Content from "../content/content";

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
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
