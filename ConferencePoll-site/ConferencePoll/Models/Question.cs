using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConferencePoll.Models
{
    public class Question
    {
        public Guid Id { get; set; }
        public int QuestionIndex { get; set; }
        public string QuestionTextHtml { get; set; }
        public string QuestionAnswers { get; set; }
        public bool IsAllowedToAnswer { get; set; }
    }
}
