import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { editEvent, getEventCardById } from "../managers/EventManager";

const EditEventForm = () => {
  const [editWatchEvent, setEditWatchEvent] = useState([]);
  const { id } = useParams();

  const history = useHistory();

  const getEventToEdit = (eventId) => {
    getEventCardById(eventId).then((editWatchEvent) =>
      setEditWatchEvent(editWatchEvent)
    );
  };

  useEffect(() => {
    getEventToEdit(id);
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const watchEventCopy = { ...editWatchEvent };

    watchEventCopy[key] = value;
    setEditWatchEvent(watchEventCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    const eventData = { ...editWatchEvent };

    const editedEvent = {
      id: id,
      eventDate: new Date(
        eventData.eventDate + " " + eventData.eventTime
      ).toISOString(),
      eventTitle: eventData.eventTitle,
      summary: eventData.summary,
    };

    editEvent(editedEvent).then(() => {
      history.push("/myevents");
    });

  };

  return (
    <>
    <div> 
    <div className="all-mighty-container"></div> 
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Input
            type="hidden"
            name="id"
            id="id"
            value={editWatchEvent.id}
          ></Input>
          <Label>Event Title</Label>
          <Input
            type="text"
            placeholder="event title"
            id="eventTitle"
            value={editWatchEvent.eventTitle}
            onChange={handleInputChange}
          ></Input>

          <Label>Event Summary</Label>
          <Input
            type="text"
            placeholder="event summary"
            id="summary"
            value={editWatchEvent.summary}
            onChange={handleInputChange}
          ></Input>

          <Label for="Date">Event Date</Label>
          <Input
            type="date"
            name="date"
            id="eventDate"
            placeholder="event date"
            value={editWatchEvent.eventDate}
            onChange={handleInputChange}
          />
          <Label for="Time">Event Time</Label>
          <Input
            type="time"
            name="time"
            id="eventTime"
            placeholder="event time"
            value={editWatchEvent.eventTime}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <div>
        {/* <div>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div> */}
      </div>
      </div>
    </>
  );
};

export default EditEventForm;
