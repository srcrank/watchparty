import { Button, CardImg } from "reactstrap";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteEvent } from "../managers/EventManager";

const style = {width: "18rem"}

export const MyEventCard = ({ eventData, getEvents }) => {
    const handleDelete = () => {
        if (window.confirm("Do you want to delete this event?")) {
          deleteEvent(eventData.id).then(() => getEvents());
        }
      };

    return (
        <Card style={style}>
          <CardImg src={eventData.posterUrl} alt="poster" />
            <CardBody>
                <h3>{eventData.eventTitle}</h3>
                <div>{eventData.summary}</div>
                <div>{eventData.mediaTitle}</div>
                <div>{eventData.eventDate}</div>
                <div>Posted By: {eventData.displayName}</div>
                <div>Created on: {eventData.createdDate}</div>
                <Link to={`/event/${eventData.id}`}><Button color="success" href="#pablo">Details</Button></Link>
                <Link to={`/event/edit/${eventData.id}`}><Button color="info" href="#pablo">Edit</Button></Link>
                <Button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </Button>
            </CardBody>
        </Card>
    )
};

export default MyEventCard;

