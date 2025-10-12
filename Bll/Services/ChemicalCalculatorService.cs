using Bll.Dto;
using Dal.Models;
using PrimeChemicalConnectionsCalculator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    public class ChemicalCalculatorService:IChemicalCalculatorService
    {
        private readonly ChemicalDbContext _context;
        public ChemicalCalculatorService(ChemicalDbContext context)
        {
            _context = context;
        }

        public Task<ChemicalConnectionDto> CalculateConnection(int AtomicNumber1, int AtomicNumber2)
        {
            var element1 = _context.TryFindElementModelByAtomicNumberAsync(AtomicNumber1);
            var element2 = _context.TryFindElementModelByAtomicNumberAsync(AtomicNumber2);

            throw new NotImplementedException();
        }
        public Task<IEnumerable<ChemicalElementDto>> GetChemicalElements()
        {
            throw new NotImplementedException();

        }
        public Task<ChemicalElementDto> GetChemicalElementByAtomicNumber(int AtomicNumber)
        {
            throw new NotImplementedException();

        }

        private ChemicalElement ConvertElementModelToExternalImplementation(ElementModel model)
        {
            ChemicalElement element = new ChemicalElement(
                number: checked((uint)model.AtomicNumber),
                mass: checked((uint)model.Mass),
                formula: model.Formula,
                name: model.Name,
                electronegativity: model.Eleckronegativity
                );
            return element;
        }
    }
}
