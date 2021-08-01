using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchPartyCapstone.Models
{
    public class EventCardModel
    {
        public int Id { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string DisplayName { get; set; }
        public string EventTitle { get; set; }
        public string Summary { get; set; }
        public string MediaTitle { get; set; }
        public string PosterUrl { get; set; }

    }
}
