import "./app.css";
import { Route, Routes, Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>{/* <Route path="/" element={<Navbar />} /> */}</Routes>
      <div>howdy</div>
    </>
  );
}

export default App;
