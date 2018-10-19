using System.Collections.Generic;

namespace DMLab1.Backend
{
    public class FoursquareVenueRecommendeationReponse
    {
        public object Meta { get; set; }
        public InnerVenueRecommendeationResponse Response { get; set; }
    }

    public class InnerVenueRecommendeationResponse
    {

        public object SuggestedFilters { get; set; }
        public object Geocode { get; set; }
        public List<VenueRecommendeationGroupInfo> Groups { get; set; }
    }

    public class VenueRecommendeationGroupInfo
    {
        public List<VenueRecommendeationItemInfo> Items { get; set; }
    }

    public class VenueRecommendeationItemInfo
    {
        public RecommendedVenue Venue { get; set; }
    }

    public class RecommendedVenue
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }

    public class FacebookLocation
    {
        public string City { get; set; }
        public string Country { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class FoursquareVenueDetailsResponse
    {
        public object Meta { get; set; }
        public InnerVenueInfoResponse Response { get; set; }
    }

    public class InnerVenueInfoResponse
    {
        public InnerVenueInfo Venue { get; set; }
    }

    public class InnerVenueInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ContactInfo Contact { get; set; }
        public LocationInfo Location { get; set; }
        public Likes Likes { get; set; }
        public AggregationObject<PhotoInfo> Photos { get; set; }
        public AggregationObject<TipInfo> Tips { get; set; }
    }

    public class ContactInfo
    {
        public string FormattedPhone { get; set; }
    }

    public class LocationInfo
    {
        public List<string> FormattedAddress { get; set; }
        public string Address => FormattedAddress != null ? string.Join(", ", FormattedAddress) : "";
    }

    public class Likes
    {
        public int Count { get; set; }
    }

    public class AggregationObject<T>
    {
        public int Count { get; set; }
        public List<GroupCollection<T>> Groups {get; set;}
    }

    public class GroupCollection<T>
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }

    public class BasePhotoInfo
    {
        public string Prefix { get; set; }
        public string Suffix { get; set; }

        public virtual string Url => $"{Prefix}100x100{Suffix}";
    }

    public class PhotoInfo : BasePhotoInfo
    {
        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        override
        public string Url => $"{Prefix}{Width}x{Height}{Suffix}";
    }

    public class TipInfo
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public User User { get; set; }
    }

    public class User {
        private string _firstName;
        private string _lastName;

        public string Id { get; set; }
        public string FirstName {
            get { return _firstName ?? ""; }
            set { _firstName = value; }
        }
        public string LastName {
            get { return _lastName ?? ""; }
            set { _lastName = value; }
        }
        public BasePhotoInfo Photo { get; set; }
    }

    public class VenueInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int LikeCount { get; set; }
        public List<string> PhotoUrls { get; set; }
        public List<Tip> Tips { get; set; }
    }

    public class Tip
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public ResponseUser User { get; set; }

        public Tip(TipInfo tip)
        {
            Id = tip.Id;
            Text = tip.Text;
            User = (tip.Type == "user") ? new ResponseUser(tip.User) : null;
        }
    }

    public class ResponseUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }

        public ResponseUser(User user)
        {
            Id = user.Id;
            Name = $"{user.FirstName} {user.LastName}";
            PhotoUrl = user.Photo.Url;
        }
    }

}
