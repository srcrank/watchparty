import { Button, CardImg } from "reactstrap";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteEvent } from "../managers/EventManager";
import * as moment from 'moment'

export const MyEventCard = ({ eventData, getEvents }) => {
  const handleDelete = () => {
    if (window.confirm("Do you want to delete this event?")) {
      deleteEvent(eventData.id).then(() => getEvents());
    }
  };

  const dateAndTime = moment(eventData.eventDate).format('MMMM Do YYYY, h:mm a')
  const createdOn = moment(eventData.createdDate).format('MMMM Do YYYY')

  return (
    <Card className="card-style">
      <CardImg src={eventData.posterUrl} alt="poster" />
      <CardBody>
        <div className="card-info-and-buttons">
        <div className="card-info-container"> 
        <h3>{eventData.eventTitle}</h3>
        <p>{eventData.summary}</p>
        <p><span className="card-text-label">Movie: </span>{eventData.mediaTitle}</p>
        <p><span className="card-text-label">When: </span>{dateAndTime}</p>
        <p><span className="card-text-label">Created By: </span>{eventData.displayName} on {createdOn}</p>
        {/* <p><span className="card-text-label">Created on: </span>{createdOn}</p> */}
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
