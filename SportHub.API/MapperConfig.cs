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

            CreateMap<User, UserListResponse>();

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

            CreateMap<Language, LanguageResponse>();

            CreateMap<Language, LanguageRequest>();

            CreateMap<LanguageRequest, Language>()
                .ForMember(dest => dest.LanguageId, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.ShortTitle, opt => opt.MapFrom(src => src.ShortTitle))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => false));

            CreateMap<SubCategoryCreateDto, SubCategory>()
                .ForMember(dest => dest.SubCategoryId, opt => opt.MapFrom(src => Guid.NewGuid()));

            CreateMap<CategoryCreateDto, Category>()
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => Guid.NewGuid()));

            CreateMap<TeamCreateDto, Team>()
                .ForMember(dest => dest.TeamId,opt => opt.MapFrom(src => Guid.NewGuid()));
            
            CreateMap<MainArticle, MainArticleRequest>();
            CreateMap<MainArticleRequest, MainArticle>()
                .ForMember(dest => dest.MainArticleId, opt => opt.MapFrom(src => ""))
                .ForMember(dest => dest.ArticleId, opt => opt.MapFrom(src => src.ArticleId))
                .ForMember(dest => dest.LanguageId, opt => opt.MapFrom(src => src.LanguageId))
                .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order));
            
            CreateMap<BreakDown, BreakDownRequest>();
            CreateMap<BreakDownRequest, BreakDown>()
                .ForMember(dest => dest.BreakDownId, opt => opt.MapFrom(src => ""));

            CreateMap<ArticleInfoCreateDto, ArticleInfo>();
			CreateMap<ArticleCreateDto, Article>();
			CreateMap<ImageCreateDto, Image>();

            CreateMap<SearchArticlesCount, SearchArticlesCountDto>();
        }
    }
}

