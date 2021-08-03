import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const EventCard = ({ eventData }) => {
    return (
        <Card>
            <CardBody>
                <h3>{eventData.eventTitle}</h3>
                <div>{eventData.summary}</div>
                <div>{eventData.mediaTitle}</div>
                <div>{eventData.eventDate}</div>
                <div>Posted By: {eventData.displayName}</div>
                <div>Created on: {eventData.createdDate}</div>
                {/* resize these big ol' images*/}
                <img src={eventData.posterUrl} alt="poster" />
                <Link to="/event/detail/:id"><button>Details</button></Link>
            </CardBody>
        </Card>
    )
};

export default EventCard;

