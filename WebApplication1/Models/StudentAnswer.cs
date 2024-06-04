using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class StudentAnswer
    {
        [Key]
        public int StudentAnswerId { get; set; }


        //[ForeignKey("QuestionId")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }


        public string AnswerText { get; set; }


        public int StudentId { get; set; }
        public Student Student { get; set; }


        public int examId { get; set; }
        public Exam exam { get; set; }
    }
}
