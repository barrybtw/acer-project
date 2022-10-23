import "./App.css";

import { useEvents } from "./main";

import { Routes, Route, Link } from "react-router-dom";
import { Events } from "./lib/Events";
import { EventPage } from "./lib/Event";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Link to={"/"}>Home</Link>
      <Link to={"/events"}>Events</Link>
    </div>
  );
}

function App() {
  const event_hook = useEvents();

  console.log(event_hook.raw);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;
