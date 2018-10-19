using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace DMLab1.Backend
{
    public static class MongoDatabase
    {
        public static readonly IMongoCollection<MongoResponseDataObject> _ResponseDataCollection;
        public static readonly IMongoCollection<MongoVenueInfoObject> _VenueInfoCollection;

        static MongoDatabase()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("dmLab1");
            _ResponseDataCollection = db.GetCollection<MongoResponseDataObject>("ResponseData");
            //_ResponseDataCollection.DeleteMany(FilterDefinition<MongoResponseDataObject>.Empty);
            _VenueInfoCollection = db.GetCollection<MongoVenueInfoObject>("VenueInfo");
            //_VenueInfoCollection.DeleteMany(FilterDefinition<MongoVenueInfoObject>.Empty);
        }

        public static void StoreResponseData(ResponseData data, Login login)
        {
            _ResponseDataCollection.InsertOne(new MongoResponseDataObject(data, login, DateTime.UtcNow));
        }

        public static void StoreVenueInfo(VenueInfo info)
        {
            _VenueInfoCollection.InsertOne(new MongoVenueInfoObject(info));
        }
    }

    public class MongoResponseDataObject
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("Response")]
        public ResponseData Response {get; set; }
        [BsonElement("Login")]
        public Login LoginData { get; set; }
        [BsonElement("Time")]
        public DateTime ResponseDate { get; set; }

        public MongoResponseDataObject(ResponseData data, Login login, DateTime date)
        {
            Response = data;
            LoginData = login;
            ResponseDate = date;
        }
    }

    public class MongoVenueInfoObject
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("VenueInfo")]
        public VenueInfo VenueInfo { get; set; }

        public MongoVenueInfoObject(VenueInfo info)
        {
            VenueInfo = info;
        }
    }

}
