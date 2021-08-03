using Microsoft.Extensions.Configuration;
using WatchPartyCapstone.Models;
using WatchPartyCapstone.Utils;

namespace WatchPartyCapstone.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFireBaseUserId(string FireBaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FireBaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email
                          FROM UserProfile up
                         WHERE FireBaseUserId = @FireBaseuserId";

                    DbUtils.AddParameter(cmd, "@FireBaseUserId", FireBaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email")

                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FireBaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email)";
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", userProfile.FireBaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        /*
        public UserProfile GetByFireBaseUserId(string FireBaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FireBaseUserId == FireBaseUserId);
        }
        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }
}