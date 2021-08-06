import React, { useEffect, useState } from "react";
import { getEventCardById } from "../managers/EventManager";
import { Card, CardBody, Button, CardImg } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../styles/Main.css";
import * as moment from "moment";

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchEvent = () => {
    return getEventCardById(id).then((eventDetail) =>
      setEventData(eventDetail)
    );
  };

  const dateAndTime = moment(eventData.eventDate).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

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
              <a className="detail-link" href={eventData.imdbUrl}>IMDB</a>
              {"  |  "}
              <a className="detail-link" href={eventData.streamUrl}>Link to Stream</a>
            </div>
          </CardBody>
        </Card>
      </div>

    </>
  );
};

export default EventDetails;
