using Core.Reposetories;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Reposetories
{
    public class UserReposetory : IUserReposetory
    {
         DataContext _context;
        public UserReposetory(DataContext context)
        {
            this._context = context;
        }
        public User AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetUserBy(string email, string password)
        {
            return _context.Users.FirstOrDefault(x=>x.Email.Equals(email) &&x.Password.Equals(password));
        }
    }
}
