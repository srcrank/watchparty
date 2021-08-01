using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchPartyCapstone.Models;
using WatchPartyCapstone.Utils;

namespace WatchPartyCapstone.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(IConfiguration configuration) : base(configuration) { }


        //getting event card data, with user display name. 
        public List<EventCardModel> GetEventCards()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    //Everything out of event table, just display name out of user table. Filters out events that have have passed in date. 
                    cmd.CommandText = @"
                        SELECT p.*, u.DisplayName
                            FROM Event p
                            LEFT JOIN UserProfile u
                                On p.UserId = u.Id
                         WHERE EventDate >= GETDATE() 
                                ";

                    var reader = cmd.ExecuteReader();

                    var events = new List<EventCardModel>();
                    while (reader.Read())
                    {
                        events.Add(new EventCardModel()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            EventDate = DbUtils.GetDateTime(reader, "EventDate"),
                            CreatedDate = DbUtils.GetDateTime(reader, "CreatedDate"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Summary = DbUtils.GetString(reader, "Summary"),
                            MediaTitle = DbUtils.GetString(reader, "MediaTitle"),
                            PosterUrl = DbUtils.GetString(reader, "PosterUrl")

                        });
                    }
                    reader.Close();

                    return events;
                }
            }
        }

        //gets events by current logged in user, displays that user's display name. 
        public List<EventCardModel> GetEventbyCurrentUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT e.*, u.DisplayName
                            FROM Event e
                            LEFT JOIN UserProfile u
                                On e.UserId = u.Id
                            WHERE e.UserId = @Id AND EventDate >= GETDATE()";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var events = new List<EventCardModel>();
                    while (reader.Read())
                    {
                        events.Add(new EventCardModel()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            EventDate = DbUtils.GetDateTime(reader, "EventDate"),
                            CreatedDate = DbUtils.GetDateTime(reader, "CreatedDate"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Summary = DbUtils.GetString(reader, "Summary"),
                            MediaTitle = DbUtils.GetString(reader, "MediaTitle"),
                            PosterUrl = DbUtils.GetString(reader, "PosterUrl")
                        });
                    }
                    reader.Close();
                    return events;
                }
            }
        }

        //Adding an event. 
        public void AddEvent(Event events)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Event (IMDBID, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
                                        OUTPUT INSERTED.ID
                                        VALUES (@IMDBId, @EventDate, 
                                                @CreatedDate, @UserId,  @Title, @Summary, @MediaTitle, @PosterUrl, @ReleaseYear ,@IMDBUrl, @StreamUrl, @OverView)";
                    DbUtils.AddParameter(cmd, "@IMDBId", events.IMDBId);
                    DbUtils.AddParameter(cmd, "@EventDate", events.EventDate);
                    DbUtils.AddParameter(cmd, "@CreatedDate", events.CreatedDate);
                    //DbUtils.AddParameter(cmd, "@isPublic", events.isPublic);
                    DbUtils.AddParameter(cmd, "@UserId", events.UserId);
                    DbUtils.AddParameter(cmd, "@Title", events.EventTitle);
                    DbUtils.AddParameter(cmd, "@Summary", events.Summary);
                    DbUtils.AddParameter(cmd, "@MediaTitle", events.MediaTitle);
                    DbUtils.AddParameter(cmd, "@PosterUrl", events.PosterUrl);
                    DbUtils.AddParameter(cmd, "@ReleaseYear", events.ReleaseYear);
                    DbUtils.AddParameter(cmd, "@IMDBUrl", events.IMDBUrl);
                    DbUtils.AddParameter(cmd, "@StreamUrl", events.StreamUrl);
                    DbUtils.AddParameter(cmd, "@OverView", events.OverView);
                    events.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //Users cannot edit the movie selection. Keep it a little more simple that way. Users can delete the event and then create a new one. 
        public void UpdateEvent(Event events)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Event
                                        SET EventTitle = @Title,
                                            EventDate = @EventDate,
                                            Summary = @Summary
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", events.Id);

                    DbUtils.AddParameter(cmd, "@Title", events.EventTitle);
                    DbUtils.AddParameter(cmd, "@EventDate", events.EventDate);
                    DbUtils.AddParameter(cmd, "@Summary", events.Summary);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        //deleting events.
        public void DeleteEvent(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Event WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
