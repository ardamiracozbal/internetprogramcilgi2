
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.viewModels;

namespace exam.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StudentAnswerController : ControllerBase
    {
        private readonly Context _context;

        public StudentAnswerController(Context context)
        {
            _context = context;
        }

        // GET: api/StudentAnswer
        [HttpGet]
        public ActionResult<IEnumerable<StudentAnswer>> GetStudentAnswer()
        {
            return _context.StudentAnswer.ToList();
        }

        // GET: api/StudentAnswer/5
        //[HttpGet("{id}")]
        //public ActionResult<StudentAnswer> GetStudentAnswer(int id)
        //{
        //    var studentAnswer = _context.StudentAnswer.Find(id);

        //    if (studentAnswer == null)
        //    {
        //        return NotFound();
        //    }

        //    return studentAnswer;
        //}

        [HttpGet("GetStudentExamAnswerGet")]
        public ActionResult<List<StudentAnswer>> GetStudentExamAnswer(int studentId, int examId)
        {
            //var studentAnswer = _context.StudentAnswer.Where(i => i.examId == examId && i.StudentId == studentId).ToList();
            var studentAnswer = _context.StudentAnswer.Where(i => i.examId == examId && i.StudentId == studentId).Include(i => i.Question).ToList();
            if (studentAnswer == null)
            {
                return NotFound();
            }


            return studentAnswer;
        }



        // POST: api/StudentAnswer
        [HttpPost]
        public ActionResult PostStudentAnswers(List<StudentAnswerAdd> studentAnswers)
        {

            if (!_context.Students.Any(i => i.StudentId == studentAnswers[0].studentId))
            {
                return Ok(new { Message = "Böyle bir ögrenci bulunamadı" });
            }


            if (_context.StudentAnswer.Any(i => i.examId == studentAnswers[0].examId && i.StudentId == studentAnswers[0].studentId))
            {
                return Ok(new { Message = "Bu sınava zaten girmişsiniz" });
            }


            List<StudentAnswer> newAnswers = new List<StudentAnswer>();

            foreach (var studentAnswer in studentAnswers)
            {
                StudentAnswer newAnswer = new StudentAnswer
                {
                    StudentId = studentAnswer.studentId,
                    examId = studentAnswer.examId,
                    QuestionId = studentAnswer.QuestionId,
                    AnswerText = studentAnswer.AnswerText
                };

                newAnswers.Add(newAnswer);
            }

            _context.StudentAnswer.AddRange(newAnswers);
            _context.SaveChanges();



            return Ok(new { Message = "Answers submitted successfully" });
        }


    }
}
