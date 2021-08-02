import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const MyEventCard = ({ eventData }) => {
    return (
        <Card>
            <CardBody>
                <h3>{eventData.eventTitle}</h3>
                <div>{eventData.summary}</div>
                <div>{eventData.mediaTitle}</div>
                <div>{eventData.eventDate}</div>
                <div>Posted By: {eventData.displayName}</div>
                <div>Created on: {eventData.createdDate}</div>
                <div>{eventData.posterUrl}</div>
                <Link to="/"><button>Details</button></Link>
                <Link to="/"><button>Edit</button></Link>
                <Link to="/"><button>Delete</button></Link>
            </CardBody>
        </Card>
    )
};

export default MyEventCard;
