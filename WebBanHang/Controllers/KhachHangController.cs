using System;
using System.Collections.Generic;
//using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public KhachHangController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: lấy danh sách khach hàng - api/KhachHang/GetAllCustoms
        [HttpGet("GetAllCustomors")]
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetAllCustomors()
        {
            return await _context.KhachHangs.ToListAsync();
        }

        // GET: Lấy thông tin chi tiết khách hàng theo id -  api/KhachHang/GetCustomDetail/5
        [HttpGet("GetCustomorDetail/{id}")]
        public async Task<ActionResult<KhachHang>> GetCustomorDetail(int id)
        {
            //Eager Loading
            var khachHang = await _context.KhachHangs
                                          .Include(kHang => kHang.BinhLuans)
                                          .Include(kHang => kHang.HoaDons)
                                          .Where(kHang => kHang.MaKhachHang == id)
                                          .FirstOrDefaultAsync();

            if (khachHang == null)
            {
                return NotFound("Custom Not Found!");
            }

            return khachHang;
        }

        // GET: Lấy thông tin khách hàng theo id - api/KhachHang/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KhachHang>> GetCustomor(int id)
        {
            var khachHang = await _context.KhachHangs.FindAsync(id);

            if (khachHang == null)
            {
                return NotFound("Custom Not Found!");
            }

            return khachHang;
        }

        //GET: Lấy danh sách khách hàng phân trang - api/KhachHang/GetCustomsPagination?PageNumber=1&PageSize=10
        [HttpGet("GetCustomorsPagination")]
        public async Task<IActionResult> GetCustomorsPagination([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            
            // lấy data từ bảng KhachHang
            var pagedData = await _context.KhachHangs
               .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
               .Take(validFilter.PageSize)
               .ToListAsync();

            // tổng số phần tử
            var totalRecords = await _context.KhachHangs.CountAsync();

            // tổng số trang
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            var pageRespone = new PagedResponse<List<KhachHang>>(pagedData, validFilter.PageNumber, validFilter.PageSize, totalRecords, roundedTotalPages);

            return Ok(pageRespone);
        }

        // GET: Tìm kiếm khách hàng theo tên - api/KhachHang/SearchCustomsByName?searchString=u
        [HttpGet("SearchCustomorsByName")]
        public async Task<IEnumerable<KhachHang>> SearchCustomorsByName(string searchString)
        {
            IQueryable<KhachHang> khachHang = _context.KhachHangs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                khachHang = khachHang.Where(kHang => kHang.TenDangNhap.Contains(searchString));
            }
            

            return await khachHang.ToListAsync();
        }


        // POST: thêm khách hàng - api/KhachHang/AddCustom
        [HttpPost("AddCustomor")]
        public async Task<ActionResult<KhachHang>> AddCustomor(KhachHang insert)
        {
            var TenParam = new SqlParameter("@Ten", insert.Ten);
            var TenDangNhapParam = new SqlParameter("@TenDangNhap", insert.TenDangNhap);
            var MatKhauParam = new SqlParameter("@MatKhau", insert.MatKhau);

            var khachHang = await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == insert.TenDangNhap);

            if (khachHang != null)
            {
                return BadRequest("Account was Existed!!");
            }
            else
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertKH @Ten, @TenDangNhap, @MatKhau", TenParam, TenDangNhapParam, MatKhauParam);
                
                return Ok("add success"); 
            } 
            
        }

        // DELETE: xóa khách hàng - api/KhachHang/DeleteCustomor/id
        [HttpDelete("DeleteCustomor/{id}")]
        public async Task<ActionResult> DeleteCustomor(int id)
        {
            var IdParam = new SqlParameter("@MaKhachHang", id);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteKH @MaKhachHang", IdParam);

            return Ok("Delete success!");
        }


        [HttpPut("UpdateCustomor/{id}")]
        public async Task<ActionResult> UpdateCustomor(int id, KhachHang updateData)
        {
            var IdParam = new SqlParameter("@MaKhachHang", id);
            var TenParam = new SqlParameter("@Ten", updateData.Ten);
            var TenDangNhapParam = new SqlParameter("@TenDangNhap", updateData.TenDangNhap);
            var MatKhauParam = new SqlParameter("@MatKhau", updateData.MatKhau);
            var AnhDaiDienParam = new SqlParameter("@AnhDaiDien", updateData.AnhDaiDien);
            var EmailParam = new SqlParameter("@Email", updateData.Email);
            var DiaChiParam = new SqlParameter("@DiaChi", updateData.DiaChi);
            var SDTParam = new SqlParameter("@SDT", updateData.Sdt);


            if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == updateData.TenDangNhap) != null)
            {
                if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == updateData.TenDangNhap && c.MaKhachHang == id) == null)
                {
                    return BadRequest("Username was Existed!");
                }
                
            }
            
            if(await _context.KhachHangs.FirstOrDefaultAsync(c => c.Email == updateData.Email) != null)
            {
                if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.Email == updateData.Email && c.MaKhachHang == id) == null)
                {
                    return BadRequest("Email was Existed!");
                }
            }


            await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateKH @MaKhachHang, @TenDangNhap, @MatKhau, @AnhDaiDien, @Email, @Ten, @DiaChi, @SDT",
                    IdParam, TenDangNhapParam, MatKhauParam, AnhDaiDienParam, EmailParam, TenParam, DiaChiParam, SDTParam);
            return Ok("Update success!");


        }

    }
}
