using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.BillDetailService
{
    public class BillDetailService : IBillDetailService
    {
        private readonly WebBanHangContext _context;

        public BillDetailService(WebBanHangContext context)
        {
            _context = context;
        }

        public async Task<int> AddBillDetail(ChiTietHoaDon insert)
        {
            var MaSpParam = new SqlParameter("@MaSP", insert.MaSp);
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", insert.MaHoaDon);
            var SoLuongParam = new SqlParameter("@Soluong", insert.SoLuong);
            var DonGiaParam = new SqlParameter("@DonGia", insert.DonGia);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertCTHD @MaSP, @MaHoaDon, @SoLuong, @DonGia",
                    MaSpParam, MaHoaDonParam, SoLuongParam, DonGiaParam);
        }

        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetAllBillDetail()
        {
            return await _context.ChiTietHoaDons.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetBillDetailByBillId(int MaHoaDon)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", MaHoaDon);

            return await _context.ChiTietHoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_SelectCTHD](@MaHoaDon)", MaHoaDonParam).ToListAsync();
        }
    }
}
