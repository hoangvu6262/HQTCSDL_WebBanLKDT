using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinhLuanController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public BinhLuanController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/BinhLuan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinhLuan>>> GetBinhLuans()
        {
            return await _context.BinhLuans.ToListAsync();
        }

        // GET: api/BinhLuan/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BinhLuan>> GetBinhLuan(int id)
        {
            var binhLuan = await _context.BinhLuans.FindAsync(id);

            if (binhLuan == null)
            {
                return NotFound();
            }

            return binhLuan;
        }

        // PUT: api/BinhLuan/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBinhLuan(int id, BinhLuan binhLuan)
        {
            if (id != binhLuan.MaBl)
            {
                return BadRequest();
            }

            _context.Entry(binhLuan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BinhLuanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BinhLuan
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BinhLuan>> PostBinhLuan(BinhLuan binhLuan)
        {
            _context.BinhLuans.Add(binhLuan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BinhLuanExists(binhLuan.MaBl))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBinhLuan", new { id = binhLuan.MaBl }, binhLuan);
        }

        // DELETE: api/BinhLuan/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBinhLuan(int id)
        {
            var binhLuan = await _context.BinhLuans.FindAsync(id);
            if (binhLuan == null)
            {
                return NotFound();
            }

            _context.BinhLuans.Remove(binhLuan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BinhLuanExists(int id)
        {
            return _context.BinhLuans.Any(e => e.MaBl == id);
        }
    }
}
