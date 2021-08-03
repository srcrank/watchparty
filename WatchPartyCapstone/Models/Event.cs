using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchPartyCapstone.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string IMDBId { get; set; }
        public DateTime EventDate { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public string EventTitle { get; set; }
        public string Summary { get; set; }
        public string MediaTitle { get; set; }
        public string PosterUrl { get; set; }
        public int ReleaseYear { get; set; }
        public string IMDBUrl { get; set; }
        public string StreamUrl { get; set; }
        public string OverView { get; set; }
    }
}
