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

        // GET: api/ChiTietHoaDon/GetBillDetailByBillId
        [HttpGet("GetBillDetailByBillId")]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetChiTietHoaDon(int MaHoaDon)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", MaHoaDon);

            var chiTietHoaDon = await _context.ChiTietHoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_SelectCTHD](@MaHoaDon)", MaHoaDonParam).ToListAsync();

            if (chiTietHoaDon == null)
            {
                return NotFound();
            }

            return chiTietHoaDon;
        }

        // POST: thêm Chi tiết hóa đơn - api/ChiTietHoaDon/AddBillDetail
        [HttpPost("AddBillDetail")]
        public async Task<ActionResult<ChiTietHoaDon>> AddBillDetail(ChiTietHoaDon insert)
        {
            var MaSpParam = new SqlParameter("@MaSP", insert.MaSp);
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", insert.MaHoaDon);
            var SoLuongParam = new SqlParameter("@Soluong", insert.SoLuong);
            var DonGiaParam = new SqlParameter("@DonGia", insert.DonGia);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertCTHD @MaSP, @MaHoaDon, @SoLuong, @DonGia",
                    MaSpParam, MaHoaDonParam, SoLuongParam, DonGiaParam);

            return Ok("Add Bill Detail Success");

        }

        
    }
}
