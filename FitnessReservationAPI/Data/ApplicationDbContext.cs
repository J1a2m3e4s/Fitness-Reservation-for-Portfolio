using FitnessReservationAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessReservationAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<KeyMaster> KeyMasters { get; set; }

        public DbSet<FitnessReservation> FitnessReservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<KeyMaster>().HasData(
                new KeyMaster { Id = 1, KeyNumber = "710", IsActive = true },
                new KeyMaster { Id = 2, KeyNumber = "711", IsActive = true },
                new KeyMaster { Id = 3, KeyNumber = "712", IsActive = true },
                new KeyMaster { Id = 4, KeyNumber = "713", IsActive = true },
                new KeyMaster { Id = 5, KeyNumber = "714", IsActive = true }
            );
        }
    }
}