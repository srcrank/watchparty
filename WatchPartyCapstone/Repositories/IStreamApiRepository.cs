using System.Threading.Tasks;
using WatchPartyCapstone.Models;

namespace WatchPartyCapstone.Repositories
{
    public interface IStreamApiRepository
    {
        Task<StreamSearchResult> Search(string searchTerm);
    }
}