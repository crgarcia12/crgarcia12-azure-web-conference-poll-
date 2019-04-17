using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ConferencePoll.Models;

namespace ConferencePoll.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ConferencePoll.Models.Question> Questions { get; set; }
        public DbSet<ConferencePoll.Models.Answer> Answers { get; set; }
    }
}
