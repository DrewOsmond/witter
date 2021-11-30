import { useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <aside className="sidebar">
      <div
        className={`sidebar__search ${focus ? "sidebar__focus" : ""}`}
        onClick={() => document.getElementById("search")?.focus()}
      >
        <i
          className={`fas fa-search ${focus ? "search__icon__focus" : ""}`}
        ></i>
        <input
          style={{ color: "#d7d7d7" }}
          id="search"
          className="sidebar__search__text"
          type="text"
          value={search}
          placeholder="Search Witter"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>

      <div>
        <h3>What's happening</h3>
      </div>
    </aside>
  );
}
