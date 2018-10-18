using System;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json;

namespace DMLab1.Backend
{
    public static class AppManager
    {
        // Read From File

        public static readonly string FOURSQUARE_CLIENT_ID;
        public static readonly string FOURSQUARE_CLIENT_SECRET;

        static AppManager()
        {
            var fileContentRaw = File.ReadAllText(@"C:\apiCredentials.json");
            var apiData = JsonConvert.DeserializeObject<ApiCredentials>(fileContentRaw);

            FOURSQUARE_CLIENT_ID = apiData.FoursquareClientId;
            FOURSQUARE_CLIENT_SECRET = apiData.FoursquareClientSecret;
        }

        public static object GetData(string location)
        {
            var request = WebRequest.CreateHttp(GetFourSquareRequestUrl("venues/explore", $"near={location}"));
            var content = GetRequestResponseContent(request);

            if (content == null)
            {
                return null;
            }

            try
            {
                var data = JsonConvert.DeserializeObject<FoursquareVenueRecommendeationReponse>(content);
                var venues = data.Response.Groups.First().Items.Select(item => item.Venue).ToList();
                return venues;
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static object GetVenueInformation(string venueId)
        {
            var request = WebRequest.CreateHttp(GetFourSquareRequestUrl($"venues/{venueId}"));
            var content = GetRequestResponseContent(request);

            if (content == null)
            {
                return null;
            }

            try
            {
                var data = JsonConvert.DeserializeObject<FoursquareVenueDetailsResponse>(content);
                return new VenueInfo
                {
                    Id = data.Response.Venue.Id,
                    LikeCount = data.Response.Venue.Likes.Count,
                    PhotoUrls = data.Response.Venue.Photos.Groups.SelectMany(g => g.Items.Select(i => i.Url)).ToList(),
                    Tips = data.Response.Venue.Tips.Groups.SelectMany(g => g.Items.Select(t => new Tip(t))).ToList()
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private static string GetRequestResponseContent(HttpWebRequest request)
        {
            try
            {
                using (var response = request.GetResponse())
                {
                    using (var responseStream = response.GetResponseStream())
                    using (var reader = new StreamReader(responseStream))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private static string GetFourSquareRequestUrl(string path, string query = "")
        {
            var baseUrl = "https://api.foursquare.com/v2/";
            return $"{baseUrl}{path}?{query}&client_id={FOURSQUARE_CLIENT_ID}&client_secret={FOURSQUARE_CLIENT_SECRET}&v=20181015";
        }
    }
}
