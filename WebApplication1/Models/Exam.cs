namespace WebApplication1.Models
{
    public class Exam
    {
        public int ExamId { get; set; }
        public string Title { get; set; }


        public ICollection<Question> Questions { get; set; } = null;
    }
}
