using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;            
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                    .Where(x=> x.UserName == username)  //First option with Where but selects all fields from database (no projection)
                    .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();
        }

        public async Task<MemberDto> GetMemberAsync2(string username)
        {
            return await _context.Users
                    .Where(x=> x.UserName == username)  //First option with Where but selects all fields from database (no projection)
                    .Select(user => new MemberDto
                    {
                        Id = user.Id,
                        UserName = user.UserName
                    }).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
                    .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)  //This way enabling eagle loading in order to load User and Photos
            .SingleOrDefaultAsync(x=> x.UserName == username);            
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)   //This way enabling eagle loading in order to load User and Photos
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
        
    }
}