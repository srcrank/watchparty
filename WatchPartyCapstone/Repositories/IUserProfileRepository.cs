using WatchPartyCapstone.Models;

namespace WatchPartyCapstone.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFireBaseUserId(string firebaseUserId);
    }
}