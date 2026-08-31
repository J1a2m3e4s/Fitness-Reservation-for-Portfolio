namespace FitnessReservationAPI.DTOs
{
    public class CreateReservationDto
    {
        public string Name { get; set; } = "";

        public string Department { get; set; } = "";

        public int KeyId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}