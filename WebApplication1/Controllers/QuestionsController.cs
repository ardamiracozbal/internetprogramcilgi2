
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.viewModels;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class QuestionsController : ControllerBase
{
    private readonly Context _context;

    public QuestionsController(Context context)
    {
        _context = context;
    }

    // GET: api/Questions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
    {
        return await _context.Questions.ToListAsync();
    }

    // GET: api/Questions/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetQuestion(int id)
    {
        var question = await _context.Questions.FindAsync(id);

        if (question == null)
        {
            return NotFound();
        }

        return question;
    }


    [HttpGet("/api/Questions/GetExamToQestions/{id}")]
    public async Task<List<Question>> GetExamToQestions(int id)
    {
        var question = await _context.Questions.Where(i => i.ExamId == id).ToListAsync();


        return question;
    }


    // POST: api/Questions
    [HttpPost]
    public async Task<ActionResult<Question>> PostQuestion(QuestionAdd question)
    {
        Question newData = new Question();
        newData.Text = question.Text;
        newData.ExamId = question.ExamId;

        await _context.Questions.AddAsync(newData);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetQuestion", new { id = newData.QuestionId }, question);
    }

    // PUT: api/Questions/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutQuestion(int id, QuestionUpdate question)
    {
        if (id != question.QuestionId)
        {
            return BadRequest();
        }
        var newData = _context.Questions.Find(question.ExamId);
        newData.ExamId = question.ExamId;
        newData.Text = question.Text;


        _context.SaveChanges();

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!QuestionExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Questions/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
        var question = await _context.Questions.FindAsync(id);
        if (question == null)
        {
            return NotFound();
        }

        _context.Questions.Remove(question);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool QuestionExists(int id)
    {
        return _context.Questions.Any(e => e.QuestionId == id);
    }
}
