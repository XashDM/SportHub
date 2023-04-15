using AutoMapper;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<User, UserResponseDto>();
            CreateMap<UserRequestDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}

