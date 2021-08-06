import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { GetAllEvents } from "../managers/EventManager";
import { Col, Container, Row } from "reactstrap";
import "../styles/Main.css"

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
    <div className="all-mighty-container"></div> 

      <div className="list-total-container">
            <div className="card-list">
              
                  {events.map((eventData) => (
                    <EventCard eventData={eventData} key={eventData.id} />
                  ))}
               
            </div>
          
      </div>
    </>
  );
};

export default EventList;
