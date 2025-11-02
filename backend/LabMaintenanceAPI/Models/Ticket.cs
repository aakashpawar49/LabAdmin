namespace LabMaintenanceAPI.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }

        // Foreign Keys
        public int DeviceId { get; set; }
        public Device? Device { get; set; }

        public int RequestedBy { get; set; }
        public User? Requester { get; set; }

        public int? AssignedTo { get; set; }
        public User? Technician { get; set; }

        // Details
        public string IssueDescription { get; set; } = string.Empty;
        public string Status { get; set; } = "open"; // open, in-progress, closed

        // Timestamps
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation property
        public ICollection<WorkLog>? WorkLogs { get; set; }
    }
}
