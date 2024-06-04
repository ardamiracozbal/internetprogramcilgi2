using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.UI.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
