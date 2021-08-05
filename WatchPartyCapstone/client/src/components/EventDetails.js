import React, { useEffect, useState } from "react";
import { getEventCardById } from "../managers/EventManager";
import { Card, CardBody } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useHistory } from 'react-router';

//Display all published posts
const EventDetails = () => {
  const [ eventData, setEventData ] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchEvent = () => {
    return getEventCardById(id).then(eventDetail => setEventData(eventDetail));
  }

//   const handleClickAddComment = (event) => {
//     event.preventDefault()
//     history.push(`${ post.id }/comments/add`)
//   }

//   const publishDate = dateFixer(post)

  useEffect(() => {
    fetchEvent();
  }, []);

  console.log(eventData)

  return (
    <>
      <Card>
        <CardBody>
        <div>
        <Link to={`/`}><button>Back to Events</button></Link>
             <h2>{eventData.eventTitle}</h2>
             <p>{eventData.summary}</p>
             <p>On: {eventData.eventDate}</p>
             <p>{eventData.mediaTitle}</p>
             <p>Synopsis: {eventData.overView}</p>
             <br />
             <a href={eventData.imdbUrl}>IMDB</a>
             <br />
             <a href={eventData.streamUrl}>Link to Stream</a>
             <br />
             <img src={eventData.posterUrl} alt="poster" />
            
         </div>

        </CardBody>
      </Card>
    </>
  )
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

