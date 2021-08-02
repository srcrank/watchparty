using System.Collections.Generic;
using WatchPartyCapstone.Models;

namespace WatchPartyCapstone.Repositories
{
    public interface IEventRepository
    {
        void AddEvent(Event events);
        void DeleteEvent(int id);
        List<EventCardModel> GetEventbyCurrentUserId(int id);
        List<EventCardModel> GetEventCards();
        Event GetEventById(int id);
        void UpdateEvent(Event events);
    }
}