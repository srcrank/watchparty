import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Form,
  Label,
  Input,
  FormText,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
} from "reactstrap";
import { addEvent } from "../managers/EventManager";
import { searchStreamApi } from "../managers/StreamApiManager";
import EventCard from "./EventCard";

const EventForm = () => {
  const [watchEvent, setWatchEvent] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  //   const getPostsWithUserInfo = () => {
  //     getAllPostsWithUserInfo().then((posts) => setPosts(posts));
  //   };

  //   useEffect(() => {
  //     getPostsWithUserInfo();
  //   }, []);

  //searching stream api.
  const mediaSearch = () => {
    const searchInput = { ...watchEvent };
    searchStreamApi(searchInput["searchKeyword"]).then((results) =>
      setSearchResults(results)
    );
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const watchEventCopy = { ...watchEvent };

    watchEventCopy[key] = value;
    setWatchEvent(watchEventCopy);
  };

  //   const handleSave = (evt) => {
  //     evt.preventDefault();
  //     addPost(post).then(() => {
  //       history.push("/Post");
  //     });
  //   }; bind if to set search results state

  return (
    <>
      <Form>
        {/* <FormGroup>
        <Label for="searchBar">... search for a movie</Label>
        <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup> */}
        <InputGroup>
          <Input
            placeholder="... search for a movie"
            id="searchKeyword"
            onChange={handleInputChange}
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={mediaSearch}>
              search
            </Button>
          </InputGroupAddon>
        </InputGroup>

        {searchResults.length > 0 && (
          <FormGroup>
            <Label for="MovieTitle">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              {/* <option>1</option> */}
              {searchResults.map((movie) => (
                <option key={movie.imdbID}>{movie.title}</option>
              ))}
            </Input>
          </FormGroup>
        )}
        <FormGroup>
          <Label>Event Title</Label>
          <Input
            type="text"
            placeholder="event title"
            id="eventTitle"
            onChange={handleInputChange}
          ></Input>

          <Label>Event Summary</Label>
          <Input
            type="text"
            placeholder="event summary"
            id="summary"
            onChange={handleInputChange}
          ></Input>

          <Label for="exampleDate">Event Date</Label>
        <Input
          type="date"
          name="date"
          id="eventDate"
          placeholder="event date"
          onChange={handleInputChange}
        />

          <Label>Event Title</Label>
          <Input
            type="text"
            placeholder="event title"
            id="eventTitle"
            onChange={handleInputChange}
          ></Input>
        </FormGroup>
        {/* <Button onClick={handleSave}>Submit</Button> */}
      </Form>
      <div>
        {/* <div>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default EventForm;
