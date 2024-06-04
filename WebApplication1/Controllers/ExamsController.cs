
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.viewModels;

namespace ExamApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly Context _context;

        public ExamsController(Context context)
        {
            _context = context;
        }

        // GET: api/Exams
        [HttpGet]
        public ActionResult<IEnumerable<Exam>> GetExams()
        {
            return _context.Exams.ToList();
        }

        // GET: api/Exams/5
        [HttpGet("{id}")]
        public ActionResult<Exam> GetExam(int id)
        {
            var exam = _context.Exams.Find(id);

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }

        // POST: api/Exams
        [HttpPost]
        public ActionResult<Exam> PostExam(ExamAdd exam)
        {
            Exam examnew = new Exam();
            examnew.Title = exam.Title;
            _context.Exams.Add(examnew);
            _context.SaveChanges();

            return CreatedAtAction("GetExam", new { id = examnew.ExamId }, exam);
        }

        // PUT: api/Exams/5
        [HttpPut("{id}")]
        public IActionResult PutExam(int id, ExamUpdate exam)
        {
            if (id != exam.ExamId)
            {
                return BadRequest();
            }
            var examUpdate = _context.Exams.Find(exam.ExamId);
            examUpdate.Title = exam.Title;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Exams/5
        [HttpDelete("{id}")]
        public IActionResult DeleteExam(int id)
        {
            var exam = _context.Exams.Find(id);
            if (exam == null)
            {
                return NotFound();
            }

            _context.Exams.Remove(exam);
            _context.SaveChanges();

            return NoContent();
        }
    }

}


