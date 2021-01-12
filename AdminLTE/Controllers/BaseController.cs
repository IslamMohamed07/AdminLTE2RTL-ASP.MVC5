using AdminLTE.Models.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace AdminLTE.Controllers.MVC
{
    public class BaseController : Controller
    {
        protected ApplicationDbContext db = System.Web.HttpContext.Current.GetOwinContext().Get<ApplicationDbContext>();
        protected string CurrentUserId;
        protected string culture;

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            CurrentUserId = User.Identity.GetUserId();
            culture = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.ToLowerInvariant();
            base.OnActionExecuting(filterContext);
        }

        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string cultureName = null;

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_AdminLTEculture"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = "ar-EG";

            // Modify current thread's cultures            
            try
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureName);
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
                if (cultureName.ToLower().Contains("ar"))
                {
                    //Thread.CurrentThread.CurrentUICulture.DateTimeFormat = new CultureInfo("ar-EG").DateTimeFormat;
                    Thread.CurrentThread.CurrentUICulture.DateTimeFormat = new CultureInfo("ar-EG").DateTimeFormat;
                }
                else
                {
                    Thread.CurrentThread.CurrentUICulture.DateTimeFormat = new CultureInfo("en-US").DateTimeFormat;
                }
            }
            catch (Exception ex)
            {
                cultureName = "ar-EG";
                Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureName);
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
                Thread.CurrentThread.CurrentUICulture.DateTimeFormat = new CultureInfo("ar-EG").DateTimeFormat;
            }
            return base.BeginExecuteCore(callback, state);
        }

    }
}