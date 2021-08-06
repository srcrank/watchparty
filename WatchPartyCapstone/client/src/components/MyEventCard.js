import { Button, CardImg } from "reactstrap";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteEvent } from "../managers/EventManager";

export const MyEventCard = ({ eventData, getEvents }) => {
  const handleDelete = () => {
    if (window.confirm("Do you want to delete this event?")) {
      deleteEvent(eventData.id).then(() => getEvents());
    }
  };

  return (
    <Card className="card-style">
      <CardImg src={eventData.posterUrl} alt="poster" />
      <CardBody>
        <div className="card-info-and-buttons">
        <div className="card-info-container"> 
        <h3>{eventData.eventTitle}</h3>
        <p>{eventData.summary}</p>
        <p><span className="card-text-label">Movie: </span>{eventData.mediaTitle}</p>
        <p><span className="card-text-label">When: </span>{eventData.eventDate.split("T")[0]} at {eventData.eventDate.split("T")[1]}</p>
        <p><span className="card-text-label">Posted By: </span>{eventData.displayName}</p>
        <p><span className="card-text-label">Created on: </span>{eventData.createdDate.split("T")[0]}</p>
        </div>
        <div className="card-button-container">
          <Link to={`/event/${eventData.id}`}>
            <Button className="detail-button">
              Details
            </Button>
          </Link>
          <Link to={`/event/edit/${eventData.id}`}>
            <Button className="edit-button">
              Edit
            </Button>
          </Link>
          <Button className="delete-button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyEventCard;
