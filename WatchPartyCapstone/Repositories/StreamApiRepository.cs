using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using WatchPartyCapstone.Models;

namespace WatchPartyCapstone.Repositories
{
    public class StreamApiRepository : IStreamApiRepository
    {
        private readonly IHttpClientFactory _clientFactory;

        //instance of httpclientfactory to handle port exhaustion, etc. 
        public StreamApiRepository(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        //search/basic?keyword={searchTerm}&country=us&service=netflix&type=movie&page=1&language=en

        public async Task<StreamSearchResult> Search(string searchTerm)
        {
            var client = _clientFactory.CreateClient("streamApiClient");
            try
            {
                var filteredResults = new StreamSearchResult();
                var streamResults = await client.GetFromJsonAsync<StreamSearchResult>($"search/basic?keyword={searchTerm}&country=us&service=netflix&type=movie&page=1&language=en");
                if (streamResults.results.Count < 1)
                {
                    return null;
                }
                else if (streamResults.TotalPages > 1)
                {
                    for (int i = 2; i <= streamResults.TotalPages; i++)
                    {
                        var streamResultsPage = await client.GetFromJsonAsync<StreamSearchResult>($"search/basic?keyword={searchTerm}&country=us&service=netflix&type=movie&page={i}&language=en");
                        streamResults.results.AddRange(streamResultsPage.results);
                    }

                    //loop through search results for keyword match in 'title' rather than match on all properties. case insensitive.
                    foreach (var streamResult in streamResults.results)
                    {
                        Console.WriteLine(streamResult.title);
                        if (streamResult.title.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase))
                        {
                            filteredResults.results.Add(streamResult);
                        }

                    }
                    return filteredResults;
                }
                else
                {
                    //loop through search results for keyword match in 'title' rather than match on all properties
                    foreach (var streamResult in streamResults.results)
                    {
                        if (streamResult.title.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase))
                        {
                            filteredResults.results.Add(streamResult);
                        }
                    }
                    return filteredResults;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}
