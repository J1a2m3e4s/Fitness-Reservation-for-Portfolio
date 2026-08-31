using FitnessReservationAPI.Data;
using FitnessReservationAPI.DTOs;
using FitnessReservationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessReservationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _context.FitnessReservations
                .Join(
                    _context.KeyMasters,
                    r => r.KeyId,
                    k => k.Id,
                    (r, k) => new
                    {
                        r.Id,
                        r.Name,
                        r.Department,
                        KeyNumber = k.KeyNumber,
                        r.StartTime,
                        r.EndTime
                    })
                .OrderBy(r => r.StartTime)
                .ToListAsync();

            return Ok(reservations);
        }
        [HttpGet("user/{name}")]
        public async Task<IActionResult> GetUserReservations(string name)
        {
            var reservations = await _context.FitnessReservations
                .Join(
                    _context.KeyMasters,
                    r => r.KeyId,
                    k => k.Id,
                    (r, k) => new
                    {
                        r.Id,
                        r.Name,
                        r.Department,
                        KeyNumber = k.KeyNumber,
                        r.StartTime,
                        r.EndTime
                    })
                .Where(r => r.Name == name)
                .OrderBy(r => r.StartTime)
                .ToListAsync();

            return Ok(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation(CreateReservationDto dto)
        {
            var existingReservation =
                await _context.FitnessReservations
                .FirstOrDefaultAsync(r =>
                    r.KeyId == dto.KeyId &&
                    dto.StartTime < r.EndTime &&
                    dto.EndTime > r.StartTime);

            if (existingReservation != null)
            {
                return BadRequest(
                    "This key is already reserved for that time.");
            }

            var reservation = new FitnessReservation
            {
                Name = dto.Name,
                Department = dto.Department,
                KeyId = dto.KeyId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime
            };

            _context.FitnessReservations.Add(reservation);

            await _context.SaveChangesAsync();

            return Ok(reservation);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation =
                await _context.FitnessReservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            _context.FitnessReservations.Remove(reservation);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}