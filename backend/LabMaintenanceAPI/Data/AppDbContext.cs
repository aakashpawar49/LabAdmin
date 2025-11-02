using LabMaintenanceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LabMaintenanceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Lab> Labs => Set<Lab>();
        public DbSet<Device> Devices => Set<Device>();
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<WorkLog> WorkLogs => Set<WorkLog>();
        public DbSet<SoftwareRequest> SoftwareRequests => Set<SoftwareRequest>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User -> TicketsRequested (1-to-many)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Requester)
                .WithMany(u => u.TicketsRequested)
                .HasForeignKey(t => t.RequestedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // User -> TicketsAssigned (1-to-many)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Technician)
                .WithMany(u => u.TicketsAssigned)
                .HasForeignKey(t => t.AssignedTo)
                .OnDelete(DeleteBehavior.Restrict);

            // User -> WorkLogs (1-to-many)
            modelBuilder.Entity<WorkLog>()
                .HasOne(w => w.Technician)
                .WithMany(u => u.WorkLogs)
                .HasForeignKey(w => w.TechnicianId)
                .OnDelete(DeleteBehavior.Restrict);

            // User -> LabsManaged (1-to-many)
            modelBuilder.Entity<Lab>()
                .HasOne(l => l.LabIncharge)
                .WithMany(u => u.LabsManaged)
                .HasForeignKey(l => l.LabInchargeId)
                .OnDelete(DeleteBehavior.Restrict);

            // Device -> Tickets (1-to-many)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Device)
                .WithMany(d => d.Tickets)
                .HasForeignKey(t => t.DeviceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Device -> SoftwareRequests (1-to-many)
            modelBuilder.Entity<SoftwareRequest>()
                .HasOne(s => s.Device)
                .WithMany(d => d.SoftwareRequests)
                .HasForeignKey(s => s.DeviceId)
                .OnDelete(DeleteBehavior.Cascade);

            // User -> SoftwareRequests (1-to-many)
            modelBuilder.Entity<SoftwareRequest>()
                .HasOne(s => s.Requester)
                .WithMany(u => u.SoftwareRequests)
                .HasForeignKey(s => s.RequestedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Ticket -> WorkLogs (1-to-many)
            modelBuilder.Entity<WorkLog>()
                .HasOne(w => w.Ticket)
                .WithMany(t => t.WorkLogs)
                .HasForeignKey(w => w.TicketId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
