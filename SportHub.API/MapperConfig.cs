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
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.IsActivated, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => false));

            CreateMap<UserUpdateRequestDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            CreateMap<User, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            CreateMap<UserGoogleDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName,
                    opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[1]))
                .ForMember(dest => dest.LastName,
                    opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[0]));

            CreateMap<SubCategoryCreateDto, SubCategory>()
                .ForMember(dest => dest.SubCategoryId, opt => opt.MapFrom(src => Guid.NewGuid()));

            CreateMap<CategoryCreateDto, Category>()
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => Guid.NewGuid()));
        }
    }
}

