using LabMaintenanceAPI.Data;
using LabMaintenanceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LabMaintenanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SoftwareRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SoftwareRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _context.SoftwareRequests
                .Include(r => r.Requester) // corrected
                .Include(r => r.Device)    // optional, include device info
                .ToListAsync();

            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequest(int id)
        {
            var request = await _context.SoftwareRequests
                .Include(r => r.Requester) // corrected
                .Include(r => r.Device)    // optional
                .FirstOrDefaultAsync(r => r.SoftwareRequestId == id);

            if (request == null) return NotFound();
            return Ok(request);
        }

        [HttpPost]
        [Authorize(Roles = "student,faculty,admin")]
        public async Task<IActionResult> CreateRequest([FromBody] SoftwareRequest request)
        {
            // Force RequestedBy from JWT
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userId, out var requestedBy))
                return Unauthorized();

            request.RequestedBy = requestedBy;
            request.CreatedAt = DateTime.Now;
            request.UpdatedAt = DateTime.Now;

            _context.SoftwareRequests.Add(request);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRequest), new { id = request.SoftwareRequestId }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(int id, [FromBody] SoftwareRequest request)
        {
            if (id != request.SoftwareRequestId) return BadRequest();
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.SoftwareRequests.FindAsync(id);
            if (request == null) return NotFound();
            _context.SoftwareRequests.Remove(request);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
