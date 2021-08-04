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

const EventForm = () => {
  const [watchEvent, setWatchEvent] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
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

  const getSelectedMovie = (evt) => {
    const searchResultCopy = [...searchResults];
    const filteredSearchSelection = searchResultCopy.filter(movie => 
      movie.title === evt.target.value)
      setSelectedMovie(filteredSearchSelection)
  }

    const handleSave = (evt) => {
      evt.preventDefault();
      const eventData = {...watchEvent};
      const movieSelection = {...selectedMovie};
      const savedEvent = {
        imdbId: movieSelection[0].imdbID,
        eventDate: new Date(eventData.eventDate + ' ' + eventData.eventTime).toISOString(),
        eventTitle: eventData.eventTitle,
        summary: eventData.summary,
        mediaTitle: movieSelection[0].title,
        posterUrl: movieSelection[0].posterURLs[780],
        releaseYear: movieSelection[0].year,
        imdbUrl: `https://www.imdb.com/title/${movieSelection[0].imdbID}`,
        streamUrl: movieSelection[0].streamingInfo.netflix.us.link,
        overView: movieSelection[0].overview
      };
      addEvent(savedEvent).then(() => {
        history.push("/");
      });
    }; 

    //bind if to set search results state

  return (
    <>
      <Form>
        
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
            <Label for="MovieTitle">Select a Movie</Label>
            <Input type="select" name="select" id="exampleSelect" placeholder="select a movie" onChange={getSelectedMovie}>
              <option>select a movie</option>
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

          <Label for="Date">Event Date</Label>
        <Input
          type="date"
          name="date"
          id="eventDate"
          placeholder="event date"
          onChange={handleInputChange}
        />
        <Label for="Time">Event Time</Label>
        <Input
          type="time"
          name="time"
          id="eventTime"
          placeholder="event time"
          onChange={handleInputChange}
        />

        </FormGroup>
        <Button onClick={handleSave}>Submit</Button>
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
