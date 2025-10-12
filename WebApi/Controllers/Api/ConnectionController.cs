using Bll.Dto;
using Bll.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        private readonly IChemicalCalculatorService _service;
        public ConnectionController(IChemicalCalculatorService service)
        {
            _service = service;
        }

        [Route("{AtomicNumber1}/{AtomicNumber2}")]
        [HttpGet]
        public async Task<IActionResult> Get(int AtomicNumber1,int AtomicNumber2)
        {
            try
            {
                return Ok(await _service.CalculateConnection(AtomicNumber1, AtomicNumber2));
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
