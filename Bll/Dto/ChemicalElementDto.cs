using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Dto
{
    public class ChemicalElementDto
    {
        public long AtomicNumber { get; set; }

        public float? Eleckronegativity { get; set; }

        public long Mass { get; set; }

        public string Name { get; set; } = null!;

        public string Formula { get; set; } = null!;

        public ElementType ElementType { get; set; }
    }
}
