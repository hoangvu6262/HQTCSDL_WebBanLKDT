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

        // POST: thêm bình luận - api/KhachHang/AddComment
        [HttpPost("AddComment")]
        public async Task<ActionResult<BinhLuan>> AddComment(BinhLuan insert)
        {
            var MaSPParam = new SqlParameter("@MaSP", insert.MaSp);
            var MaKHParam = new SqlParameter("@MaKhachHang", insert.MaKhachHang);
            var NoiDungParam = new SqlParameter("@NoiDungBinhLuan", insert.NoiDungBinhLuan);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertBL @MaSP, @MaKhachHang, @NoiDungBinhLuan",
                    MaSPParam, MaKHParam, NoiDungParam);

            return Ok("Add Comment Success");

        }

        // DELETE: xóa Danh mục - api/KhachHang/DeleteCategory/id
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var IdParam = new SqlParameter("@MaBL", id);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteBL @MaBL", IdParam);

            return Ok("Delete Comment Success!");
        }

    }
}
