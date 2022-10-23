import { useNavigate } from "react-router-dom";
import { useEvents } from "../main";

export const Events = () => {
  const event_hook = useEvents();
  const navigate = useNavigate();

  if (event_hook.raw.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div className="Events">
      {event_hook.raw.map((event) => (
        <div key={event.id}>
          <h1>{event.title}</h1>
          <br />
          <button
            onClick={() => {
              navigate(`/events/${event.id}`);
            }}
          >
            Go to event
          </button>
        </div>
      ))}
    </div>
  );
};
