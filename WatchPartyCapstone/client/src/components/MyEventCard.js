import { Button } from "bootstrap";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteEvent } from "../managers/EventManager";

export const MyEventCard = ({ eventData, handleDelete }) => {
    // const handleDelete = () => {
    //     if (window.confirm("Do you want to delete this event?")) {
    //       deleteEvent(eventData.id).then(() => getEvents());
    //     }
    //   };

    return (
        <Card>
            <CardBody>
                <h3>{eventData.eventTitle}</h3>
                <div>{eventData.summary}</div>
                <div>{eventData.mediaTitle}</div>
                <div>{eventData.eventDate}</div>
                <div>Posted By: {eventData.displayName}</div>
                <div>Created on: {eventData.createdDate}</div>
                <img src={eventData.posterUrl} alt="poster" />
                <Link to="/"><button>Details</button></Link>
                <Link to="/event/edit"><button>Edit</button></Link>
                <Button className="button" onClick={() => handleDelete(eventData.id)}>Delete</Button>
            </CardBody>
        </Card>
    )
};

export default MyEventCard;

