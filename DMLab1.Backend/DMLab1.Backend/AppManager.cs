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
        public static readonly string OPEN_WEATHER_MAP_KEY;

        static AppManager()
        {
            var fileContentRaw = File.ReadAllText(@"C:\apiCredentials.json");
            var apiData = JsonConvert.DeserializeObject<ApiCredentials>(fileContentRaw);

            FOURSQUARE_CLIENT_ID = apiData.FoursquareClientId;
            FOURSQUARE_CLIENT_SECRET = apiData.FoursquareClientSecret;
            OPEN_WEATHER_MAP_KEY = apiData.OpenWeatherMapKey;
        }

        public static ResponseData GetData(FacebookLocation location)
        {
            var foursquareRequest = WebRequest.CreateHttp(GetFourSquareRequestUrl("venues/explore", $"near={location.City}"));
            var foursquareContent = GetRequestResponseContent(foursquareRequest);

            if (foursquareContent == null)
            {
                return null;
            }

            var openWeatherMapRequest = WebRequest.CreateHttp(GetOpenWeatherMapRequestUrl(location.Latitude, location.Longitude)); ;
            var openWeatherMapContent = GetRequestResponseContent(openWeatherMapRequest);

            try
            {
                var fourSquareData = JsonConvert.DeserializeObject<FoursquareVenueRecommendeationReponse>(foursquareContent);
                var venues = fourSquareData.Response.Groups.First().Items.Select(item => item.Venue).ToList();

                var openWeatherMapData = JsonConvert.DeserializeObject<OpenWeatherMapResponse>(openWeatherMapContent);
                var weather = new WeatherResponse
                {
                    Description = openWeatherMapData.Weather.FirstOrDefault()?.Description,
                    Pressure = openWeatherMapData.Main.Pressure,
                    Temperature = openWeatherMapData.Main.Temp
                };

                return new ResponseData
                {
                     Venues = venues,
                     Weather = weather
                };
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static VenueInfo GetVenueInformation(string venueId)
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
                    Name = data.Response.Venue.Name,
                    PhoneNumber = data.Response.Venue.Contact.FormattedPhone,
                    Address = data.Response.Venue.Location.Address,
                    Description = data.Response.Venue.Description,
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

        private static string GetOpenWeatherMapRequestUrl(double latitude, double longitude)
        {
            var baseUrl = "http://api.openweathermap.org/data/2.5/weather";
            return $"{baseUrl}?lat={latitude}&lon={longitude}&units=metric&APPID={OPEN_WEATHER_MAP_KEY}";
        }
    }
}
