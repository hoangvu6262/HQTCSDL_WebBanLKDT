using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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

        // GET: api/TinTuc/GetNewsList
        [HttpGet("GetNewsList")]
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetTinTucs()
        {
            return await _context.TinTucs.FromSqlRaw("SELECT * FROM [dbo].[F_SelectTT]()").ToListAsync();
        }

        // GET: api/TinTuc/GetNewsById/{id}
        [HttpGet("GetNewsById/{id}")]
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

        // GET: Tìm kiếm tin tức theo nguoi viet- api/tintuc/GetNewsByAuthor
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


        // POST: Thêm tin tức - api/TinTuc/AddNews
        [HttpPost("AddNews")]
        public async Task<ActionResult> AddNews(TinTuc insert)
        {
            var TieuDeParam = new SqlParameter("@TieuDe", insert.TieuDe);
            var NoiDungParam = new SqlParameter("@NoiDung", insert.NoiDung);
            var HinhAnhParam = new SqlParameter("@HinhAnh", insert.HinhAnh);
            var TacGiaParam = new SqlParameter("@TacGia", insert.TacGia);

            if (await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == insert.TieuDe) != null)
            {
                
                return BadRequest("News was Existed!");
            }

            await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertTT @TieuDe, @NoiDung, @HinhAnh, @TacGia", TieuDeParam, NoiDungParam, HinhAnhParam, TacGiaParam);

            return Ok("Add News Success!");
        }


        // DELETE: xóa Tin tức - api/TinTuc/DeleteNews/id
        [HttpDelete("DeleteNews/{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var IdParam = new SqlParameter("@MaTinTuc", id);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteDM @MaTinTuc", IdParam);

            return Ok("Delete News Success!");
        }

        // PUT: update Tin Tức - api/TinTuc/UpdateNews/{id}
        [HttpPut("UpdateNews/{id}")]
        public async Task<ActionResult> UpdateNews(int id, TinTuc updateData)
        {
            var MaTinTucParam = new SqlParameter("@MaTinTuc", id);
            var TieuDeParam = new SqlParameter("@TieuDe", updateData.TieuDe);
            var NoiDungParam = new SqlParameter("@NoiDung", updateData.NoiDung);
            var HinhAnhParam = new SqlParameter("@HinhAnh", updateData.HinhAnh);
            var TacGiaParam = new SqlParameter("@TacGia", updateData.TacGia);


            if (await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == updateData.TieuDe) != null)
            {
                if(await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == updateData.TieuDe && tt.MaTinTuc == id ) == null)
                {
                    return BadRequest("News was Existed!");
                }

            }

            await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateTT @MaTinTuc, @TieuDe, @NoiDung, @HinhAnh, @TacGia", 
                MaTinTucParam, TieuDeParam, NoiDungParam, HinhAnhParam, TacGiaParam);

            return Ok("update News Success!");
        }
    }
}
