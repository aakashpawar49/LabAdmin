using LabMaintenanceAPI.Data;
using LabMaintenanceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LabMaintenanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkLogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkLogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkLogs()
        {
            var logs = await _context.WorkLogs.Include(w => w.Ticket).ToListAsync();
            return Ok(logs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkLog(int id)
        {
            var log = await _context.WorkLogs.Include(w => w.Ticket).FirstOrDefaultAsync(w => w.WorkLogId == id);
            if (log == null) return NotFound();
            return Ok(log);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkLog([FromBody] WorkLog log)
        {
            _context.WorkLogs.Add(log);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWorkLog), new { id = log.WorkLogId }, log);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkLog(int id, [FromBody] WorkLog log)
        {
            if (id != log.WorkLogId) return BadRequest();
            _context.Entry(log).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkLog(int id)
        {
            var log = await _context.WorkLogs.FindAsync(id);
            if (log == null) return NotFound();
            _context.WorkLogs.Remove(log);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
