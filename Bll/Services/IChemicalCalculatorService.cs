using Bll.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    internal interface IChemicalCalculatorService
    {
        public Task<ChemicalConnectionDto> CalculateConnection(int AtomicNumber1, int AtomicNumber2);
        public Task<IEnumerable<ChemicalElementDto>> GetChemicalElements();
        public Task<ChemicalElementDto> GetChemicalElementByAtomicNumber(int AtomicNumber);
    }
}
