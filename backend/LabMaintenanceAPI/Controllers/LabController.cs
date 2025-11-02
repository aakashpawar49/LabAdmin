using LabMaintenanceAPI.Data;
using LabMaintenanceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LabMaintenanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LabController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LabController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLabs()
        {
            var labs = await _context.Labs.ToListAsync();
            return Ok(labs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLab(int id)
        {
            var lab = await _context.Labs.FindAsync(id);
            if (lab == null) return NotFound();
            return Ok(lab);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLab([FromBody] Lab lab)
        {
            _context.Labs.Add(lab);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLab), new { id = lab.LabId }, lab);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLab(int id, [FromBody] Lab lab)
        {
            if (id != lab.LabId) return BadRequest();
            _context.Entry(lab).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLab(int id)
        {
            var lab = await _context.Labs.FindAsync(id);
            if (lab == null) return NotFound();
            _context.Labs.Remove(lab);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
