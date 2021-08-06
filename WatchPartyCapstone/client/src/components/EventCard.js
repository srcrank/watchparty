import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import "../styles/Main.css";
import * as moment from "moment"

export const EventCard = ({ eventData }) => {
  return (
    <Card className="card-style">
      <CardImg src={eventData.posterUrl} alt="poster" />
      <CardBody>
      <div className="card-info-and-buttons">
        <div className="card-info-container"> 
        <h3>{eventData.eventTitle}</h3>
        <p>{eventData.summary}</p>
        <p><span className="card-text-label">Movie: </span>{eventData.mediaTitle}</p>
        <p><span className="card-text-label">When: </span>{moment(eventData.eventDate).format('MMMM Do YYYY, h:mm a')}</p>
        <p><span className="card-text-label">Created By: </span>{eventData.displayName} on {moment(eventData.createdDate).format('MMMM Do YYYY')}</p>
        <div className="card-button-container">
          <Link to={`/event/${eventData.id}`}>
            <Button className="detail-button">
              Details
            </Button>
          </Link>
        </div>
        </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventCard;
