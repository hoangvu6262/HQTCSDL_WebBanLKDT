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
    public class TinTucController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public TinTucController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/TinTuc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetTinTucs()
        {
            return await _context.TinTucs.ToListAsync();
        }

        // GET: api/TinTuc/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TinTuc>> GetTinTuc(int id)
        {
            var tinTuc = await _context.TinTucs.FindAsync(id);

            if (tinTuc == null)
            {
                return NotFound();
            }

            return tinTuc;
        }

        // GET: Tìm kiếm tin tức theo tiêu đề - api/tintuc/GetNewsByTitle
        [HttpGet("GetNewsByTitle")]
        public async Task<IEnumerable<TinTuc>> GetNewsByTitle(string searchString)
        {
            IQueryable<TinTuc> news = _context.TinTucs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                news = news.Where(n => n.TieuDe.Contains(searchString));
            }

            return await news.ToListAsync();
        }

        // GET: Tìm kiếm tin tức theo tiêu đề - api/tintuc/GetNewsByAuthor
        [HttpGet("GetNewsByAuthor")]
        public async Task<IEnumerable<TinTuc>> GetNewsByAuthor(string searchString)
        {
            IQueryable<TinTuc> news = _context.TinTucs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                news = news.Where(n => n.TacGia.Contains(searchString));
            }

            return await news.ToListAsync();
        }
    }
}
