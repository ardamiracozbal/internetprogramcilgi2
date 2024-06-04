using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.UI.Controllers
{

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Question()
        {
            return View();
        }


        public IActionResult Sinav()
        {
            return View();
        }

        public IActionResult Student()
        {
            return View();
        }


    }
}
