using System.Collections.Generic;

namespace LabMaintenanceAPI.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // admin, faculty, student, labTech

        // Tickets the user requested
        public ICollection<Ticket>? TicketsRequested { get; set; }

        // Tickets assigned to the user (technician)
        public ICollection<Ticket>? TicketsAssigned { get; set; }

        // Work logs for this user (if technician)
        public ICollection<WorkLog>? WorkLogs { get; set; }

        // Labs this user manages (optional, for LabIncharge)
        public ICollection<Lab>? LabsManaged { get; set; }

        // Software requests made by this user
        public ICollection<SoftwareRequest>? SoftwareRequests { get; set; }
    }
}
