using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WatchPartyCapstone.Models;
using WatchPartyCapstone.Repositories;

namespace WatchPartyCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
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


        [HttpGet("user")]
        public IActionResult GetUserEventCards()
        {
            var user = GetCurrentUser();
            return Ok(_eventRepository.GetEventbyCurrentUserId(user.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var eventItem = _eventRepository.GetEventById(id);
            if (eventItem == null)
            {
                return NotFound();
            }
            return Ok(eventItem);
        }

        [HttpPost]
        public IActionResult AddEvent(Event events)
        {
            //passing currentuser id for adding event here
            var user = GetCurrentUser();
            events.UserId = user.Id;
            _eventRepository.AddEvent(events);
            return CreatedAtAction("GetEventById", new { id = events.Id }, events);
        }

        [HttpPut("edit/{id}")]
        public IActionResult PutEvent(int id, Event events)
        {
            if (id != events.Id)
            {
                return BadRequest();
            }

            _eventRepository.UpdateEvent(events);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            _eventRepository.DeleteEvent(id);
            return NoContent();
        }
        private UserProfile GetCurrentUser()
        //private methods are used as helpers
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (firebaseUserId != null)
            {
                return _userProfileRepository.GetByFireBaseUserId(firebaseUserId);
            }
            else
            {
                return null;

            }
        }

    }
}

