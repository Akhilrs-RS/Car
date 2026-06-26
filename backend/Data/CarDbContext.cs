using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class CarDbContext : DbContext
{
    public CarDbContext(DbContextOptions<CarDbContext> options) : base(options)
    {
    }

    public DbSet<Vehicle> Vehicles { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial mock data for local development if desired
        modelBuilder.Entity<Vehicle>().HasData(
            new Vehicle
            {
                Id = 1,
                Make = "Toyota",
                Model = "Camry",
                Year = 2021,
                Price = 24500.00m,
                KMDriven = 35000,
                FuelType = "Hybrid",
                Transmission = "Automatic",
                Location = "Los Angeles",
                Color = "Silver",
                Status = "Available",
                Description = "Excellent condition Camry Hybrid. Highly fuel efficient, clean history."
            },
            new Vehicle
            {
                Id = 2,
                Make = "Honda",
                Model = "Civic",
                Year = 2020,
                Price = 19800.00m,
                KMDriven = 42000,
                FuelType = "Petrol",
                Transmission = "Automatic",
                Location = "San Francisco",
                Color = "Modern Steel",
                Status = "Available",
                Description = "Reliable daily commuter. Single owner, regular maintenance logs available."
            }
        );
    }
}
