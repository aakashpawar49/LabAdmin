using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabMaintenanceAPI.Models
{
    public class Lab
    {
        public int LabId { get; set; }

        public string LabName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;

        // Lab Incharge relation
        [ForeignKey("LabIncharge")]
        public int? LabInchargeId { get; set; }
        public User? LabIncharge { get; set; }

        // Devices in this lab
        public ICollection<Device>? Devices { get; set; }
    }
}
