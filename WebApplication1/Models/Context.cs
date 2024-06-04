using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace WebApplication1.Models
{
    public class Context : IdentityDbContext<AppUser, AppRole, string>
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentAnswer> StudentAnswer { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<Question> Questions { get; set; }

        public Context(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<AppUser>
            modelBuilder.Entity<IdentityUserLogin<int>>().HasKey(x => new { x.ProviderKey, x.LoginProvider });
            modelBuilder.Entity<IdentityUserRole<int>>().HasKey(x => new { x.UserId, x.RoleId });

            modelBuilder
                .Entity<StudentAnswer>()
                .HasOne(e => e.Student)
                .WithMany()
                .OnDelete(DeleteBehavior.ClientCascade);
        }



    }
}
