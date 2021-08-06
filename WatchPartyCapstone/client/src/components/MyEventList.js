import React, { useEffect, useState } from "react";
import MyEventCard from "./MyEventCard";
import { Link, useParams } from "react-router-dom";
import { GetEventsByUser } from "../managers/EventManager";

const MyEventList = () => {
  const [myEvents, setMyEvents] = useState([]);

  // const getPosts = () => {
  //     getAllPosts().then(posts => setPosts(posts));
  // }

  const getEventsWithUserData = () => {
    GetEventsByUser().then((events) => {
      const filteredEvents = events.sort((a, b) => {
        if (a.eventDate < b.eventDate) {
          return -1;
        }
        if (a.eventDate > b.eventDate) {
          return 1;
        }
        return 0;
      });

      setMyEvents(filteredEvents);
    });
  };

  // setMyEvents(events));
  // }

  useEffect(() => {
    getEventsWithUserData();
  }, []);

  return (
    <>
      <div>
        <div className="all-mighty-container"></div>
        <div>
          <div className="card-list">
            {myEvents.map((eventData) => (
              <MyEventCard
                eventData={eventData}
                key={eventData.id}
                getEvents={getEventsWithUserData}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEventList;
