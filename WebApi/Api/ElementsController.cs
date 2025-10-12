using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementsController : ControllerBase
    {
        private readonly ChemicalDbContext _context;
        public ElementsController(ChemicalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<ElementModel>> Get()
        {
            return await _context.ElementModels.ToListAsync();
        }
    }
}
