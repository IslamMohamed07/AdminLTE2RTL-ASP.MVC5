using System;
using System.Collections.Generic;
using System.Linq;
using AdminLTE.Models.Data;
using AdminLTE.Models.Domains;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AdminLTE.Startup))]

namespace AdminLTE
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
