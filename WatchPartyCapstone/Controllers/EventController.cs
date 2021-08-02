using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchPartyCapstone.Models;
using WatchPartyCapstone.Repositories;

namespace WatchPartyCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IStreamApiRepository _streamApiRepository;

        public EventController(IEventRepository eventRepository, IUserProfileRepository userProfileRepository, IStreamApiRepository streamApiRepository)
        {
            _eventRepository = eventRepository;
            _userProfileRepository = userProfileRepository;
            _streamApiRepository = streamApiRepository;
        }

        //GET: api/Event/movie stuff

        [HttpGet("stream")]
        public async Task<ActionResult<StreamSearchResult>> StreamSearch(string searchTerm)
        {
            var searchResults = await _streamApiRepository.Search(searchTerm);
            if (searchResults == null || searchResults.results.Count == 0)
            {
                return NotFound();
            }
            return Ok(searchResults.results);
        }

        // GET: api/<EventController>
        [HttpGet]
        public IActionResult GetAllEventCards()
        {
            return Ok(_eventRepository.GetEventCards());
        }


        [HttpGet("user/{id}")]
        public IActionResult GetUserEventCards(int id)
        {
            return Ok(_eventRepository.GetEventbyCurrentUserId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            return Ok(_eventRepository.GetEventById(id));
        }

        [HttpPost]
        public IActionResult AddEvent(Event events)
        {
            _eventRepository.AddEvent(events);
            return CreatedAtAction("GetEventById", new { id = events.Id }, events);
        }

    }
}

