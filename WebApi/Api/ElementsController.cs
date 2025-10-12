using Bll.Services;
using Bll.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementsController : ControllerBase
    {
        private readonly IChemicalCalculatorService _service;
        public ElementsController(IChemicalCalculatorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<ChemicalElementDto>> Get()
        {
            return await _service.GetChemicalElements();
        }

        [Route("{AtomicNumber}")]
        [HttpGet]
        public async Task<ChemicalElementDto> Get(int AtomicNumber)
        {
            return await _service.GetChemicalElementByAtomicNumber(AtomicNumber);
        }
    }
}
