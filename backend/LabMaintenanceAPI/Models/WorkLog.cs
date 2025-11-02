using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabMaintenanceAPI.Models
{
    public class WorkLog
    {
        public int WorkLogId { get; set; }

        // Ticket relation
        [ForeignKey("Ticket")]
        public int TicketId { get; set; }
        public Ticket? Ticket { get; set; }

        // Technician relation
        [ForeignKey("Technician")]
        public int TechnicianId { get; set; }
        public User? Technician { get; set; }

        // Work details
        public string ActionTaken { get; set; } = string.Empty;
        public string? Remarks { get; set; }

        // Timestamp
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
