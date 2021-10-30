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
    public class ChiTietHoaDonController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public ChiTietHoaDonController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/ChiTietHoaDon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetChiTietHoaDons()
        {
            return await _context.ChiTietHoaDons.ToListAsync();
        }

        // GET: api/ChiTietHoaDon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChiTietHoaDon>> GetChiTietHoaDon(int id)
        {
            var chiTietHoaDon = await _context.ChiTietHoaDons.FindAsync(id);

            if (chiTietHoaDon == null)
            {
                return NotFound();
            }

            return chiTietHoaDon;
        }

        // PUT: api/ChiTietHoaDon/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChiTietHoaDon(int id, ChiTietHoaDon chiTietHoaDon)
        {
            if (id != chiTietHoaDon.MaCthd)
            {
                return BadRequest();
            }

            _context.Entry(chiTietHoaDon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTietHoaDonExists(id))
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

        // POST: api/ChiTietHoaDon
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChiTietHoaDon>> PostChiTietHoaDon(ChiTietHoaDon chiTietHoaDon)
        {
            _context.ChiTietHoaDons.Add(chiTietHoaDon);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChiTietHoaDonExists(chiTietHoaDon.MaCthd))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChiTietHoaDon", new { id = chiTietHoaDon.MaCthd }, chiTietHoaDon);
        }

        // DELETE: api/ChiTietHoaDon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChiTietHoaDon(int id)
        {
            var chiTietHoaDon = await _context.ChiTietHoaDons.FindAsync(id);
            if (chiTietHoaDon == null)
            {
                return NotFound();
            }

            _context.ChiTietHoaDons.Remove(chiTietHoaDon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChiTietHoaDonExists(int id)
        {
            return _context.ChiTietHoaDons.Any(e => e.MaCthd == id);
        }
    }
}
