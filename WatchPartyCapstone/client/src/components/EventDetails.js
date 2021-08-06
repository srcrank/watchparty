import React, { useEffect, useState } from "react";
import { getEventCardById } from "../managers/EventManager";
import { Card, CardBody, Button, CardImg } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../styles/Main.css";
import * as moment from 'moment';

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchEvent = () => {
    return getEventCardById(id).then((eventDetail) =>
      setEventData(eventDetail)
    );
  };

//   const dateFixer = () => {
//     // const date = new Date(eventData.eventDate);
//     const cutDate = moment(eventData.eventDate).format('MMMM Do YYYY, h:mm:ss a')
//     eventData.eventDate = cutDate
// };


const dateAndTime = moment(eventData.eventDate).format('MMMM Do YYYY, h:mm:ss a')

  useEffect(() => {
    fetchEvent();
  }, []);


  return (
    <>
      <div>
        <div className="all-mighty-container"></div>
        <div className="details-page-button-container">
          <Link to={`/`}>
            <Button className="details-page-button">Back to Events</Button>
          </Link>
          <Link to={`/myevents`}>
            <Button className="details-page-button">Back to My Events</Button>
          </Link>
        </div>

        {/* <div className="card-bodyandimg-container"> */}
          
          <Card className="details-card">
          <CardImg
            className="details-card-img detailimage"
            src={eventData.posterUrl}
            alt="poster"
          />
            <CardBody>
              <div>
                <h2>{eventData.eventTitle}</h2>
                <p>{eventData.summary}</p>
                <p>
                  <span className="card-text-label">When: </span>
                  {dateAndTime}
                </p>
                <p>
                  <span className="card-text-label">Movie: </span>
                  {eventData.mediaTitle}
                </p>
                <p>
                  <span className="card-text-label">Synopsis: </span>
                  {eventData.overView}
                </p>
                <br />
                <a href={eventData.imdbUrl}>IMDB</a>
                <br />
                <a href={eventData.streamUrl}>Link to Stream</a>
              </div>
            </CardBody>
          </Card>
        </div>
      {/* </div> */}
    </>
  );
};

export default EventDetails;

// import React, { useState, useEffect } from 'react';
// import { getEventCardById } from '../managers/EventManager';
// import { useParams } from 'react-router';

// export const GetEventDetails = () => {
//     const [eventDetails, setEventDetails] = useState({});
//     const { eventId } = useParams();

//     const getEvent = () => {
//         getEventCardById(eventId)
//             .then(eventData => {
//                 setEventDetails(eventData)
//             })
//     }

//     useEffect(() => {
//         getEvent();
//     }, [])

//     return (
//         <div>
//             <h2>{eventDetails.eventTitle}</h2>
//             <p>{eventDetails.summary}</p>
//             <p>On: {eventDetails.eventDate}</p>
//             <p>{eventDetails.mediaTitle}</p>
//             <br />
//             <p>Posted by: {eventDetails.displayName}</p>
//             <p>Created On: {eventDetails.createdDate}</p>
//             <a href={eventDetails.IMDBUrl}>IMDB</a>
//             <a href={eventDetails.streamUrl}>Link to Stream</a>
//             {/* <img src={eventDetails.posterUrl} alt="poster" /> */}

//         </div>
//     )
// }
