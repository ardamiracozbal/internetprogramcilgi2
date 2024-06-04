using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Mapping
{
    public class Map : Profile
    {
        public Map()
        {
            CreateMap<AppUser, UserDto>().ReverseMap();
        }
    }
}
