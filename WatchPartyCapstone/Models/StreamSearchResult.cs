using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WatchPartyCapstone.Models
{
    public class StreamSearchResult
    {
        public List<Result> results { get; set; } = new List<Result>();
        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }
    }

    public class Result
    {
        public string imdbID { get; set; }
        public int year { get; set; }
        public string title { get; set; }
        public string overview { get; set; }

        [JsonPropertyName("posterURLs")]
        public PosterUrl posterURL { get; set; }
        public Streaminginfo streamingInfo { get; set; }
    }


    public class PosterUrl
    {
        [JsonPropertyName("780")]
        public string _780 { get; set; }
    }

    public class Streaminginfo
    {
        public Netflix netflix { get; set; }
    }

    public class Netflix
    {
        [JsonPropertyName("us")]
        public Country country { get; set; }
    }

    public class Country
    {
        public string link { get; set; }
    }
}