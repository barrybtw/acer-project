import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../main";
import type { Event } from "../main";
import { Fragment } from "react";

export const EventPage = () => {
  const { id } = useParams<Event["id"]>();

  if (!id) {
    throw new Error("No id found");
  }

  if (typeof id !== "string") {
    throw new Error("id is not a string");
  }

  const event_hook = useEvents();

  const navigate = useNavigate();

  const event = event_hook.get_event(id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="Event">
      <h1>{event?.title}</h1>
      <br />
      <h2>Participants</h2>
      <br />
      <div>
        {event?.participants.map((participant) => (
          <Fragment key={participant.id}>
            <hr />
            <div key={participant.id}>
              <h3>{participant.name}</h3>
              <br />
              <h4>{participant.email}</h4>
              <br />
              <h4>{participant.phone}</h4>
              <br />
              <h4>{participant.address}</h4>
              <br />
              <h4>{participant.city}</h4>
              <br />
              <h4>{participant.state}</h4>
              <br />
              <h4>{participant.zip}</h4>
              <br />
              <h4>{participant.country}</h4>
              <br />
              <button
                onClick={() => {
                  event_hook.remove_participant(event.id, participant.id);
                }}
              >
                Remove from event
              </button>
            </div>
          </Fragment>
        ))}
      </div>
      <button
        onClick={() => {
          event_hook.remove_event(event.id);
          navigate("/events");
        }}
      >
        Remove event
      </button>
    </div>
  );
};
