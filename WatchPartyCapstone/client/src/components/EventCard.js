import { Button } from "reactstrap";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";

const style = {width: "18rem"}

export const EventCard = ({ eventData }) => {
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
                {/* resize these big ol' images*/}
                {/* <img src={eventData.posterUrl} alt="poster" /> */}
                <Link to={`/event/${eventData.id}`}><Button color="primary" href="#pablo">Details</Button></Link>
            </CardBody>
        </Card>
    )
};

export default EventCard;

