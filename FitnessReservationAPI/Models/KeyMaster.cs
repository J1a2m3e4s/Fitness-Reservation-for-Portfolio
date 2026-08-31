namespace FitnessReservationAPI.Models
{
    public class KeyMaster
    {
        public int Id { get; set; }

        public string KeyNumber { get; set; } = "";

        public bool IsActive { get; set; } = true;

        public ICollection<FitnessReservation> Reservations
        {
            get;
            set;
        } = new List<FitnessReservation>();
    }
}