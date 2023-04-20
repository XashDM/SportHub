using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
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

        public GoogleAuthorizationController(IHttpClientFactory httpClientFactory, IConfiguration config, 
            IUserService userService, IMapper mapper, IJwtService jwtService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _userService = userService;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> AuthUser(string accessToken)
        {
            try
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

                    var userFromDb = await _userService.GetUserByEmailAsync(userInfo.Email);
                    
                    if (userFromDb == null)
                    {
                        var user = _mapper.Map<UserGoogleDto, User>(userInfo);
                        await _userService.InsertOneAsync(_mapper.Map<User, UserRequestDto>(user));
                        userFromDb = await _userService.GetUserByEmailAsync(user.Email);
                        await _userService.ActivateUserAccountAsync(userFromDb.UserId);
                    }

                    var tokens = await _jwtService.GenerateTokensAsync(userFromDb);
                        
                    return Ok(tokens);
                }
                else
                {
                    return BadRequest(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
    
}


