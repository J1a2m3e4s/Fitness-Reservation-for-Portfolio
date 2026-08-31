using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessReservationAPI.Models
{
    public class FitnessReservation
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Department { get; set; } = "";

        public int KeyId { get; set; }

        [ForeignKey(nameof(KeyId))]
        public KeyMaster? KeyMaster { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}