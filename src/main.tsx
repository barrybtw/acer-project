import React, { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: Participant[];
}

export type Events = Event[];

interface EventContext {
  raw: Events;
  remove_event: (id: Event["id"]) => void;
  add_event: (event: Event) => void;
  update_event: (event: Event) => void;
  get_event: (id: Event["id"]) => Event | undefined;
  get_participant: (
    event_id: Event["id"],
    participant_id: Participant["id"],
  ) => Participant | undefined;
  add_participant: (event_id: Event["id"], participant: Participant) => void;
  update_participant: (event_id: Event["id"], participant: Participant) => void;
  remove_participant: (
    event_id: Event["id"],
    participant_id: Participant["id"],
  ) => void;
  get_participant_count: (event_id: Event["id"]) => number | undefined;
}

const EventContext = React.createContext<EventContext>({} as EventContext);

const EventProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [events, setEvents] = useState<Events>([] as Events);

  const doSeed = true;

  useEffect(() => {
    if (doSeed) {
      const seed = [
        {
          id: "1",
          title: "Event 1",
          date: "2021-01-01",
          location: "Location 1",
          participants: [
            {
              id: "1",
              name: "Participant 1",
              email: "email@gmail.com",
              phone: "123-456-7890",
              address: "123 Main St",
              city: "City 1",
              state: "State 1",
              zip: "12345",
              country: "Country 1",
            },
            {
              id: "2",
              name: "Participant 2",
              email: "email@gmail.com",
              phone: "123-456-7890",
              address: "123 Main St",
              city: "City 1",
              state: "State 1",
              zip: "12345",
              country: "Country 1",
            },
          ],
        },
        {
          id: "2",
          title: "Event 2",
          date: "2021-01-01",
          location: "Location 2",
          participants: [
            {
              id: "3",
              name: "Participant 3",
              email: "email@gmail.com",
              phone: "123-456-7890",
              address: "123 Main St",
              city: "City 2",

              state: "State 2",
              zip: "12345",

              country: "Country 2",
            },
          ],
        },
      ];
      setEvents(seed);
    }
  }, []);

  const state = {
    raw: events,
    remove_event: (id: Event["id"]) => {
      setEvents(events.filter((event) => event.id !== id));
    },

    add_event: (event: Event) => {
      setEvents([...events, event]);
    },

    update_event: (event: Event) => {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    },

    get_event: (id: Event["id"]) => {
      return events.find((event) => event.id === id);
    },

    get_participant: (id: Event["id"], participant_id: string) => {
      const event = events.find((event) => event.id === id);
      return event?.participants.find((p) => p.id === participant_id);
    },

    add_participant: (id: Event["id"], participant: Participant) => {
      const event = events.find((event) => event.id === id);
      if (event) {
        event.participants.push(participant);
        setEvents([...events]);
      }

      return event;
    },

    update_participant: (id: Event["id"], participant: Participant) => {
      const event = events.find((event) => event.id === id);
      if (event) {
        event.participants = event.participants.map((p) =>
          p.id === participant.id ? participant : p,
        );
        setEvents([...events]);
      }
    },

    remove_participant: (
      id: Event["id"],
      participant_id: Participant["id"],
    ) => {
      const event = events.find((event) => event.id === id);
      if (event) {
        event.participants = event.participants.filter(
          (p) => p.id !== participant_id,
        );
        setEvents([...events]);
      }
    },

    get_participant_count: (id: Event["id"]) => {
      const event = events.find((event) => event.id === id);
      return event?.participants.length;
    },
  };

  return (
    <EventContext.Provider value={state}>{children}</EventContext.Provider>
  );
};

export const useEvents = () => {
  const events = React.useContext(EventContext);

  if (!events) {
    throw new Error("useEvents must be used within an EventProvider");
  }

  return events as EventContext;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
