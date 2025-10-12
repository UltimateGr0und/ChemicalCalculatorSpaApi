using Bll.Dto;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ChemicalConnectionDto> CalculateConnection(int AtomicNumber1, int AtomicNumber2)
        {
            var elementModel1 = await _context.TryFindElementModelByAtomicNumberAsync(AtomicNumber1);//Throws InvalidOperationException
            var elementModel2 = await _context.TryFindElementModelByAtomicNumberAsync(AtomicNumber2);//Throws InvalidOperationException

            var connection = new ChemicalConnection(
                ConvertElementModelToExternalImplementation(elementModel1),//Throws ArgumentException
                ConvertElementModelToExternalImplementation(elementModel2));//Throw ArgumentException

            return ConvertExternalChemicalConnectionToDto(connection);
        }
        public async Task<IEnumerable<ChemicalElementDto>> GetChemicalElements()
        {
            return await _context.ElementModels.Select(el => ConvertElementModelToDto(el)).ToListAsync();

        }
        public async Task<ChemicalElementDto> GetChemicalElementByAtomicNumber(int AtomicNumber)
        {
            var element = await _context.TryFindElementModelByAtomicNumberAsync(AtomicNumber);//Throws InvalidOperationException
            return ConvertElementModelToDto(element);
        }

        private static ChemicalElement ConvertElementModelToExternalImplementation(ElementModel model)
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
        private static ChemicalConnectionDto ConvertExternalChemicalConnectionToDto(ChemicalConnection connection)
        {
            return new ChemicalConnectionDto
            {
                Name = connection.Name,
                Formula = connection.Formula,
                Mass = connection.Mass
            };
        }
        private static ChemicalElementDto ConvertElementModelToDto(ElementModel model)
        {
            return new ChemicalElementDto
            {
                AtomicNumber = checked((uint)model.AtomicNumber),
                Mass = checked((uint)model.Mass),
                Formula = model.Formula,
                Name = model.Name,
                Eleckronegativity = model.Eleckronegativity,
                ElementType = model.ElementType
            };
        }
    }
}
