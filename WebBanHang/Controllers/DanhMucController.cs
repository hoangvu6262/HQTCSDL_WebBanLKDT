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
    public class DanhMucController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public DanhMucController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/DanhMuc/GetAllCategories
        [HttpGet("GetAllCategories")]
        public async Task<ActionResult<IEnumerable<DanhMuc>>> GetAllCategories()
        {
            return await _context.DanhMucs.FromSqlRaw("SELECT * FROM [dbo].[F_SelectDM]()").ToListAsync();
        }

        // GET: api/DanhMuc/5
        [HttpGet("GetCategoryById/{id}")]
        public async Task<ActionResult<DanhMuc>> GetCategoryById(int id)
        {
            var danhMuc = await _context.DanhMucs.FindAsync(id);

            if (danhMuc == null)
            {
                return NotFound("Category Not Found!");
            }

            return danhMuc;
        }


        // GET: Lấy thông tin chi tiết Danh muc theo id -  api/KhachHang/GetBillDetail/5
        [HttpGet("GetCategoryDetailById/{id}")]
        public async Task<ActionResult<DanhMuc>> GetCategoryDetailById(int id)
        {
            //Eager Loading
            var danhMuc = await _context.DanhMucs
                                          .Include(DM => DM.SanPhams)
                                          .Where(DM => DM.MaDanhMuc == id)
                                          .FirstOrDefaultAsync();

            if (danhMuc == null)
            {
                return NotFound("Category Not Found!");
            }

            return danhMuc;
        }

        // POST: thêm Danh mục - api/KhachHang/AddCategory
        [HttpPost("AddCategory")]
        public async Task<ActionResult<DanhMuc>> AddCategory(DanhMuc insert)
        {
            var TenDMParam = new SqlParameter("@TenDanhMuc", insert.TenDanhMuc);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertDM @TenDanhMuc",
                    TenDMParam);

            return Ok("add category success");

        }

        // DELETE: xóa Danh mục - api/KhachHang/DeleteCategory/id
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var IdParam = new SqlParameter("@MaDanhMuc", id);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteDM @MaDanhMuc", IdParam);

            return Ok("Delete category success!");
        }

        // PUT: update danh mục - api/HoaDon/UpdateCategory/{id}
        [HttpPut("UpdateCategory/{id}")]
        public async Task<ActionResult> UpdateCategory(int id, DanhMuc updateData)
        {
            var IdParam = new SqlParameter("@MaDanhMuc", id);
            var TenDMParam = new SqlParameter("@TenDanhMuc", updateData.TenDanhMuc);


            if (await _context.DanhMucs.FirstOrDefaultAsync(d => d.TenDanhMuc == updateData.TenDanhMuc) != null)
            {
                if (await _context.DanhMucs.FirstOrDefaultAsync(d => d.TenDanhMuc == updateData.TenDanhMuc && d.MaDanhMuc == id) == null)
                {
                    return BadRequest("Category was Existed!");
                }

            }

            await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateDM @MaDanhMuc, @TenDanhMuc", IdParam, TenDMParam);
            return Ok("update category success!");
        }

    }
}
