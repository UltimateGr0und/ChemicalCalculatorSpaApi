using Bll.Services;
using Bll.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace WebApi.Controllers.Api
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
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _service.GetChemicalElements());
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("{AtomicNumber}")]
        [HttpGet]
        public async Task<IActionResult> Get(int AtomicNumber)
        {
            try
            {
                return Ok(await _service.GetChemicalElementByAtomicNumber(AtomicNumber));
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
