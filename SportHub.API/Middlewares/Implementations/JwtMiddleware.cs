using Microsoft.AspNetCore.Mvc;
using SportHub.API.Helpers;

namespace SportHub.API.Middlewares.Implementations;

public class JwtMiddleware : IJwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task Invoke(HttpContext context, IJwtService jwtService)
        {
            var accessToken = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(accessToken))
            {
                context.Response.StatusCode = 401; // Unauthorized
                return;
            }
            
            if (!jwtService.ValidateToken(accessToken))
            {
                context.Response.StatusCode = 401; // Unauthorized
                return;
            }
    
            // Add user data to request context for later use
            // context.Items["UserData"] = userData;
    
            await _next(context);
            
        }
}