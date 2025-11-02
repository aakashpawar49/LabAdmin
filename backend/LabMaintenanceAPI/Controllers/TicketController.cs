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
    public class TicketController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "admin,faculty")]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _context.Tickets
                .Include(t => t.Device)
                .Include(t => t.Requester)    // corrected
                .Include(t => t.Technician)   // corrected
                .ToListAsync();

            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var ticket = await _context.Tickets
                .Include(t => t.Device)
                .Include(t => t.Requester)    // corrected
                .Include(t => t.Technician)   // corrected
                .FirstOrDefaultAsync(t => t.TicketId == id);

            if (ticket == null) return NotFound();

            // Students can only view their own tickets
            if (userRole == "student" && ticket.RequestedBy.ToString() != userId)
            {
                return Forbid();
            }

            // Lab technicians can only view tickets assigned to them
            if (userRole == "labTech" && ticket.AssignedTo?.ToString() != userId)
            {
                return Forbid();
            }

            return Ok(ticket);
        }

        [HttpPost]
        [Authorize(Roles = "admin,faculty,student")]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            // Set the requester to the current user
            if (int.TryParse(userId, out int requesterId))
            {
                ticket.RequestedBy = requesterId;
            }

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.TicketId }, ticket);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin,faculty,labTech")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket ticket)
        {
            if (id != ticket.TicketId) return BadRequest();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Lab technicians can only update tickets assigned to them
            if (userRole == "labTech")
            {
                var existingTicket = await _context.Tickets.FindAsync(id);
                if (existingTicket?.AssignedTo?.ToString() != userId)
                {
                    return Forbid();
                }
            }

            _context.Entry(ticket).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("my-tickets")]
        public async Task<IActionResult> GetMyTickets()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid user ID");
            }

            var tickets = new List<Ticket>();

            if (userRole == "student")
            {
                // Students can see tickets they created
                tickets = await _context.Tickets
                    .Include(t => t.Device)
                    .Include(t => t.Requester)
                    .Include(t => t.Technician)
                    .Where(t => t.RequestedBy == userIdInt)
                    .ToListAsync();
            }
            else if (userRole == "labTech")
            {
                // Lab technicians can see tickets assigned to them
                tickets = await _context.Tickets
                    .Include(t => t.Device)
                    .Include(t => t.Requester)
                    .Include(t => t.Technician)
                    .Where(t => t.AssignedTo == userIdInt)
                    .ToListAsync();
            }
            else
            {
                return Forbid();
            }

            return Ok(tickets);
        }

        // Student-friendly bug report with optional screenshot upload
        public class ReportBugRequest
        {
            public int DeviceId { get; set; }
            public string Description { get; set; } = string.Empty;
            public IFormFile? Screenshot { get; set; }
        }

        [HttpPost("report")]
        [Authorize(Roles = "student")]
        [RequestSizeLimit(20_000_000)] // ~20MB
        public async Task<IActionResult> ReportBug([FromForm] ReportBugRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userId, out int requestedBy))
                return Unauthorized();

            string? savedRelativePath = null;
            if (request.Screenshot != null && request.Screenshot.Length > 0)
            {
                var uploadsRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsRoot)) Directory.CreateDirectory(uploadsRoot);
                var fileName = $"bug_{Guid.NewGuid():N}{Path.GetExtension(request.Screenshot.FileName)}";
                var fullPath = Path.Combine(uploadsRoot, fileName);
                await using (var stream = System.IO.File.Create(fullPath))
                {
                    await request.Screenshot.CopyToAsync(stream);
                }
                savedRelativePath = $"/uploads/{fileName}";
            }

            var descriptionWithLink = savedRelativePath == null
                ? request.Description
                : $"{request.Description}\n\nScreenshot: {savedRelativePath}";

            var ticket = new Ticket
            {
                DeviceId = request.DeviceId,
                RequestedBy = requestedBy,
                IssueDescription = descriptionWithLink,
                Status = "open",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.TicketId }, ticket);
        }
    }
}
