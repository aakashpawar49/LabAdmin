using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabMaintenanceAPI.Models
{
    public class SoftwareRequest
    {
        public int SoftwareRequestId { get; set; }

        // Device relation
        public int DeviceId { get; set; }
        public Device? Device { get; set; }

        // Requested by User
        [ForeignKey("Requester")]       // Tells EF that RequestedBy is the FK for Requester
        public int RequestedBy { get; set; }
        public User? Requester { get; set; }

        // Software details
        public string SoftwareName { get; set; } = string.Empty;
        public string Version { get; set; } = string.Empty;
        public string Status { get; set; } = "pending"; // pending, installed, rejected

        // Timestamps
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
