using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportHub.Business;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GoogleAuthorizationController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;

        public GoogleAuthorizationController(IHttpClientFactory httpClientFactory,
            IUserService userService, IMapper mapper, IJwtService jwtService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _userService = userService;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AuthUser(string accessToken)
        {
            try
            {
                UserGoogleDto? userInfo = await GetUserInfoFromGoogleByToken(accessToken);

                if (userInfo == null)
                {
                    return BadRequest("Access token invalid");
                }

                User? userFromDb = await _userService.GetUserByEmailAsync(userInfo.Email);

                if (userFromDb == null)
                {
                    var user = _mapper.Map<UserGoogleDto, User>(userInfo);
                    await _userService.CreateUserAsync(user, true);
                    userFromDb = await _userService.GetUserByEmailAsync(userInfo.Email);
                }

                var jwtResponse = await _jwtService.GenerateTokensAsync(userFromDb);
                UserResponseDto userDto =  _mapper.Map<User, UserResponseDto>(jwtResponse.User);
                
                return Ok(new
                {
                    AccessToken = jwtResponse.AccessToken,
                    User = userDto
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task<UserGoogleDto?> GetUserInfoFromGoogleByToken(string accessToken)
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

            // Send the request to the Google userinfo API
            var response = await _httpClient.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                // Deserialize the JSON response into an UserGoogleDto
                UserGoogleDto userInfo = JsonConvert.DeserializeObject<UserGoogleDto>(content);

                return userInfo;
            }

            return null;
        }
    }
}


