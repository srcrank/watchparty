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
        GetEventsByUser().then(events => setMyEvents(events));
    }

    useEffect(() => {
        getEventsWithUserData();
    }, []);

    return (
        <>
            <div>
                <div>
                    {myEvents.map((eventData) => (
                        <MyEventCard eventData={eventData} key={eventData.id} getEvents={getEventsWithUserData} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyEventList;