import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { GetAllEvents } from "../managers/EventManager";
import { Col, Container, Row } from "reactstrap";

const EventList = () => {
  const [events, setEvents] = useState([]);

  const getEventsWithUserData = () => {
    GetAllEvents().then((events) => {
      const filteredEvents = events.sort((a, b) => {
        if (a.eventDate < b.eventDate) {
          return -1;
        }
        if (a.eventDate > b.eventDate) {
          return 1;
        }
        return 0;
      });

      setEvents(filteredEvents);
    });
  };

  // setEvents(events));

  useEffect(() => {
    getEventsWithUserData();
  }, []);

  return (
    <>
      <Link to="/event/add"> Create Event </Link>
      <div>
       
            <div>
              
                  {events.map((eventData) => (
                    <EventCard eventData={eventData} key={eventData.id} />
                  ))}
               
            </div>
          
      </div>
    </>
  );
};

export default EventList;
