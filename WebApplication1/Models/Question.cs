namespace WebApplication1.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
    }

}
