
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.viewModels;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly Context _context;

    public StudentsController(Context context)
    {
        _context = context;
    }

    // GET: api/Students
    [HttpGet]
    public ActionResult<IEnumerable<Student>> GetStudents()
    {
        return _context.Students.ToList();
    }

    // GET: api/Students/5
    [HttpGet("{id}")]
    public ActionResult<Student> GetStudent(int id)
    {
        var student = _context.Students.Find(id);

        if (student == null)
        {
            return NotFound();
        }

        return student;
    }

    // POST: api/Students
    [HttpPost]
    public ActionResult<Student> PostStudent(StudentAdd student)
    {
        Student student1 = new Student();
        student1.Name = student.Name;
        _context.Students.Add(student1);
        _context.SaveChanges();

        return CreatedAtAction("GetStudent", new { id = student1.StudentId }, student);
    }

    // PUT: api/Students/5
    [HttpPut("{id}")]
    public IActionResult PutStudent(int id, StudentUpdate student)
    {
        if (id != student.StudentId)
        {
            return BadRequest();
        }
        var update = _context.Students.Find(student.StudentId);
        update.Name = student.Name;

        _context.SaveChanges();

        return NoContent();
    }

    // DELETE: api/Students/5
    [HttpDelete("{id}")]
    public IActionResult DeleteStudent(int id)
    {
        var student = _context.Students.Find(id);
        if (student == null)
        {
            return NotFound();
        }

        _context.Students.Remove(student);
        _context.SaveChanges();

        return NoContent();
    }
}
