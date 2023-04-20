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
            CreateMap<User, UserRequestDto>();
            CreateMap<UserRequestDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<UserGoogleDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName,
                    opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[1]))
                .ForMember(dest => dest.LastName,
                    opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[0]));
        }
    }
}

