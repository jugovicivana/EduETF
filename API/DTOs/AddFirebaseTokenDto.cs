using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddFirebaseTokenDto
    {

        public int UserId { get; set; }
        public string Token { get; set; }
    }
}