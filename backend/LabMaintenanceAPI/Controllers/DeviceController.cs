using LabMaintenanceAPI.Data;
using LabMaintenanceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LabMaintenanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DeviceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDevices()
        {
            var devices = await _context.Devices.Include(d => d.Lab).ToListAsync();
            return Ok(devices);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDevice(int id)
        {
            var device = await _context.Devices.Include(d => d.Lab).FirstOrDefaultAsync(d => d.DeviceId == id);
            if (device == null) return NotFound();
            return Ok(device);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDevice([FromBody] Device device)
        {
            _context.Devices.Add(device);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDevice), new { id = device.DeviceId }, device);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDevice(int id, [FromBody] Device device)
        {
            if (id != device.DeviceId) return BadRequest();
            _context.Entry(device).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null) return NotFound();
            _context.Devices.Remove(device);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
