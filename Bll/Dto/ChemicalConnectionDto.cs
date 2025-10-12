using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Dto
{
    public class ChemicalConnectionDto
    {
        public string Formula {  get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public uint Mass {  get; set; }

    }
}
