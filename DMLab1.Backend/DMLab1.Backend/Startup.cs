using Owin;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DMLab1.Backend
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            config.MapHttpAttributeRoutes();
            appBuilder.UseWebApi(config);

        }
    }
}
