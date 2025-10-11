using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Dto
{
    public class ChemicalConnectionDto
    {
        public ChemicalElementDto element1 { get; set; } = null!;
        public ChemicalElementDto element2 { get; set; } = null!;
        public int index1 { get; set; }
        public int index2 { get; set; }
    }
}
