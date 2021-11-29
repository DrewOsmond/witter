import "./app.css";
import { Routes } from "react-router-dom";
import Navbar from "../navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>{/* <Route path="/" element={<Navbar />} /> */}</Routes>
    </>
  );
}

export default App;
