using LabMaintenanceAPI.Data;
using LabMaintenanceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LabMaintenanceAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginAsync(LoginRequest request);
        Task<AuthResponse?> RegisterAsync(RegisterRequest request);
        Task<AuthResponse?> RefreshTokenAsync(string refreshToken);
        Task<bool> LogoutAsync(string refreshToken);
    }

    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly Dictionary<string, DateTime> _refreshTokens = new(); // In production, use Redis or database

        public AuthService(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return null;

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();
            var expiresAt = DateTime.UtcNow.AddMinutes(15);

            // Store refresh token (in production, store in database)
            _refreshTokens[refreshToken] = DateTime.UtcNow.AddDays(7);

            return new AuthResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = expiresAt,
                User = new UserDto
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }

        public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (existingUser != null)
                return null;

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();
            var expiresAt = DateTime.UtcNow.AddMinutes(15);

            // Store refresh token
            _refreshTokens[refreshToken] = DateTime.UtcNow.AddDays(7);

            return new AuthResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = expiresAt,
                User = new UserDto
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }

        public async Task<AuthResponse?> RefreshTokenAsync(string refreshToken)
        {
            if (!_refreshTokens.ContainsKey(refreshToken))
                return null;

            if (_refreshTokens[refreshToken] < DateTime.UtcNow)
            {
                _refreshTokens.Remove(refreshToken);
                return null;
            }

            // In a real app, you'd decode the refresh token to get user info
            // For simplicity, we'll need to store user info with refresh tokens
            // This is a simplified implementation
            return null;
        }

        public async Task<bool> LogoutAsync(string refreshToken)
        {
            if (_refreshTokens.ContainsKey(refreshToken))
            {
                _refreshTokens.Remove(refreshToken);
                return true;
            }
            return false;
        }
    }
}


