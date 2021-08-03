import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { editEvent, getEventCardById } from "../managers/EventManager";

const EditMyEvent = () => {
    const [myEvent, setMyEvent] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const getEventToEdit = (eventId) => {
        getEventCardById(eventId).then(myEvent => setMyEvent(myEvent));
    }

    useEffect(() => {
        getEventToEdit(id);
    }, []);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        console.log("value", value);
        console.log("param", id);


        const eventCopy = { ...myEvent };

        eventCopy[key] = value;
        setMyEvent(eventCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();

        const editedEvent = {
            id: myEvent.id,
            title: myEvent.title,
            summary: myEvent.summary,
            eventDate: new Date(myEvent.eventDate + ' ' + myEvent.eventTime).toISOString()
        }

        editEvent(editedEvent)
            .then(() => {
                // Navigate the user back to the home route
                history.push("/myevents");
            });
    };

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="name">Tag</Label>
                    <Input type="hidden" name="id" id="id" value={myEvent.id}></Input>
                    <Input type="text" name="name" id="name" placeholder="Event Title"
                        value={myEvent.title}
                        onChange={handleInputChange} />
                    <Input type="text" name="name" id="name" placeholder="Event Title"
                        value={myEvent.summary}
                        onChange={handleInputChange} />
                    <Label for="Date">Event Date</Label>
        <Input
          type="date"
          name="date"
          id="eventDate"
          placeholder="event date"
          value={myEvent.eventDate}
          onChange={handleInputChange}
        />
        <Label for="Time">Event Time</Label>
        <Input
          type="time"
          name="time"
          id="eventTime"
          placeholder="event time"
          value={myEvent.eventTime}
          onChange={handleInputChange}
        />
                </FormGroup>
                <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            </Form>
        </>
    );
};

export default EditMyEvent;