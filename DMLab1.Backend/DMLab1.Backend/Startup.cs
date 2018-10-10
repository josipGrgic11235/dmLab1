using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Owin;
using System.Web.Http;
using System.Net.Http;


namespace DMLab1.Backend
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.EnableCors();
            /*config.Routes.MapHttpRoute(
                name: "createUserApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );*/
            config.MapHttpAttributeRoutes();
            appBuilder.UseWebApi(config);

        }
    }
}
