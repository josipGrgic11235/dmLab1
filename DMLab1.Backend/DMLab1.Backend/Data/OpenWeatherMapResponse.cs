using System.Collections.Generic;

namespace DMLab1.Backend
{
    public class OpenWeatherMapResponse
    {
        public Coord Coord { get; set; }
        public List<Weather> Weather { get; set; }
        public MainInfo Main { get; set; }
    }

    public class Coord
    {
        public double Lon { get; set; }
        public double Lat { get; set; }
    }

    public class Weather
    {
        public int Id { get; set; }
        public string Main { get; set; }
        public string Description { get; set; }
    }

    public class MainInfo
    {
        public double Temp { get; set; }
        public double Pressure { get; set; }
    }

    public class WeatherResponse
    {
        public double Temperature { get; set; }
        public double Pressure { get; set; }
        public string Description { get; set; }
    }

}
