using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConferencePoll.Models
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public string UserId { get; set; }
        public int QuestionIndex { get; set; }
        public int AnswerIndex { get; set; }
    }
}
