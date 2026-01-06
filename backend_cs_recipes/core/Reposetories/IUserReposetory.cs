using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Reposetories
{
    public interface IUserReposetory
    {
        public List<User> GetAll();
        public User GetUserBy(string email, string password);
        public User AddUser(User user); 

    }
}
