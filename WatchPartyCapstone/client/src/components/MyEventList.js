import React, { useEffect, useState } from "react";
import MyEventCard from "./MyEventCard";
import { Link } from "react-router-dom";
import { GetEventsByUser } from "../managers/EventManager";

const MyEventList = () => {
    const [events, setEvents] = useState([]);

    // const getPosts = () => {
    //     getAllPosts().then(posts => setPosts(posts));
    // }
    const getEventsWithUserData = () => {
        GetEventsByUser().then(events => setEvents(events));
    }

    useEffect(() => {
        getEventsWithUserData();
    }, []);

    return (
        <>
            <div>
                <div>
                    {events.map((eventData) => (
                        <MyEventCard eventData={eventData} key={eventData.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyEventList;