using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabMaintenanceAPI.Models
{
    public class Device
    {
        public int DeviceId { get; set; }

        public string DeviceName { get; set; } = string.Empty;
        public string DeviceType { get; set; } = string.Empty; // AC, PC, Projector, Printer, Other
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "working";

        // Lab relation
        [ForeignKey("Lab")]
        public int LabId { get; set; }
        public Lab? Lab { get; set; }

        // Navigation Properties
        public ICollection<Ticket>? Tickets { get; set; }
        public ICollection<SoftwareRequest>? SoftwareRequests { get; set; }
    }
}
