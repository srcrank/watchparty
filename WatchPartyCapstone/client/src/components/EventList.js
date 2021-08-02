import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { GetAllEvents } from "../managers/EventManager";

const EventList = () => {
    const [events, setEvents] = useState([]);

    // const getPosts = () => {
    //     getAllPosts().then(posts => setPosts(posts));
    // }
    const getEventsWithUserData = () => {
        GetAllEvents().then(events => setEvents(events));
    }

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
    )
}

export default EventList;