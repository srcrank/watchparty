import React, { useState, useEffect } from 'react';
import { getEventCardById } from '../managers/EventManager';
import { useParams } from 'react-router';

export const GetEventDetails = () => {
    const [eventDetails, setEventDetails] = useState({});
    const { eventId } = useParams();

    const getEvent = () => {
        getEventCardById(eventId)
            .then(eventData => {
                setEventDetails(eventData)
            })
    }

    useEffect(() => {
        getEvent();
    }, [])

    return (
        <div>
            <h2>{eventDetails.eventTitle}</h2>
            <p>{eventDetails.summary}</p>
            <p>On: {eventDetails.eventDate}</p>
            <p>{eventDetails.mediaTitle}</p>
            <br />
            <p>Posted by: {eventDetails.displayName}</p>
            <p>Created On: {eventDetails.createdDate}</p>
            <a href={eventDetails.IMDBUrl}>IMDB</a>
            <a href={eventDetails.streamUrl}>Link to Stream</a>
            {/* <img src={eventDetails.posterUrl} alt="poster" /> */}
            
        </div>
    )
}

