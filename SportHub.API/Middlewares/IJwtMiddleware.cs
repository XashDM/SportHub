using SportHub.API.Helpers;

namespace SportHub.API.Middlewares;

public interface IJwtMiddleware
{
    public Task Invoke(HttpContext context, IJwtService jwtService);
}