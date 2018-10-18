using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
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
            try
            {
                var request = WebRequest.CreateHttp(GetFourSquareRequestUrl("venues/explore", $"near={location}"));
                var content = GetRequestResponseContent(request);

                if (content == null)
                {
                    return null;
                }

                var data = JsonConvert.DeserializeObject<FoursquareReponse>(content);
                var venues = data.Response.Groups.First().Items.Select(item => item.Venue).ToList();
                return venues;
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

        private static string GetFourSquareRequestUrl(string path, string query)
        {
            var baseUrl = "https://api.foursquare.com/v2/";
            return $"{baseUrl}{path}?{query}&client_id={FOURSQUARE_CLIENT_ID}&client_secret={FOURSQUARE_CLIENT_SECRET}&v=20181015";
        }
    }
}
