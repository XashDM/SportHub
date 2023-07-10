using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Business.Interfaces;
using SportHub.Business.Services;
using SportHub.Data.Factories;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(MapperConfig));

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<INavigationRepository, NavigationRepository>();
builder.Services.AddScoped<INavigationService, NavigationService>();

builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IArticleService, ArticleService>();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<ISubCategoryRepository, SubCategoryRepository>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();

builder.Services.AddScoped<ITeamsRepository, TeamsRepository>();
builder.Services.AddScoped<ITeamsService, TeamsService>();

builder.Services.AddScoped<INavigationTreeRepository, NavigationTreeRepository>();
builder.Services.AddScoped<INavigationTreeService,NavigationTreeService>();

builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILanguageRepository, LanguageRepository>();

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILanguageService, LanguageService>();

// Add jwt access token validation
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"])),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy =>
    {
        policy.RequireRole("admin");
    });

    options.AddPolicy("UserPolicy", policy =>
    {
        policy.RequireRole("user");
    });
});

builder.Services.AddHttpClient();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
    
});
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
