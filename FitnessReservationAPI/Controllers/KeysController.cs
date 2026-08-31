using FitnessReservationAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessReservationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KeysController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KeysController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetKeys()
        {
            var keys = await _context.KeyMasters
                .Where(k => k.IsActive)
                .ToListAsync();

            return Ok(keys);
        }
    }
}