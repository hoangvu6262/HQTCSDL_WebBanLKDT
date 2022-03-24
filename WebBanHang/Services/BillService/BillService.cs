using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.BillService
{
    public class BillService : IBillService
    {
        private readonly WebBanHangContext _context;

        public BillService(WebBanHangContext context)
        {
            _context = context;
        }


        // Add Bill
        public async Task<int> AddBill(HoaDon insert)
        {
            var MaKhachHangParam = new SqlParameter("@MaKhachHang", insert.MaKhachHang);
            var TongTienParam = new SqlParameter("@TongTien", insert.TongTien);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertHD @MaKhachHang, @TongTien",
                    MaKhachHangParam, TongTienParam);
        }


        // Check MaHoaDon
        public async Task<bool> CheckMaHoaDon(int MaHoaDon)
        {
            if(await _context.HoaDons.FirstOrDefaultAsync(b => b.MaHoaDon == MaHoaDon) != null)
            {
                return true;
            }

            return false;
        }

        public async Task<int> CheckOutOrder(HoaDon insert)
        {
            _context.HoaDons.Add(insert);
            return await _context.SaveChangesAsync();
        }


        // Delete Bill
        public async Task<int> DeleteBill(int id)
        {
            var IdParam = new SqlParameter("@MaHoaDon", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteHD @MaHoaDon", IdParam);
        }


        // Get All Bills
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetAllBills()
        {
            return await _context.HoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_SelectHD]()").ToListAsync();
        }


        // Get Bill By Id
        public async Task<ActionResult<HoaDon>> GetBillById(int id)
        {
            return await _context.HoaDons.FindAsync(id);
        }


        // Get Bill By Status
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetBillByStatus(int status)
        {
            switch (status)
            {
                case 1:
                    return await _context.HoaDons.FromSqlRaw("SELECT * FROM [dbo].[F_SelectHD1]()").ToListAsync();
                case 2:
                    return await _context.HoaDons.FromSqlRaw("SELECT * FROM [dbo].[F_SelectHD2]()").ToListAsync();
                case 3:
                    return await _context.HoaDons.FromSqlRaw("SELECT * FROM [dbo].[F_SelectHD3]()").ToListAsync();
                case 4:
                    return await _context.HoaDons.FromSqlRaw("SELECT * FROM [dbo].[F_SelectHD4]()").ToListAsync();
                default:
                    return await _context.HoaDons.FromSqlRaw("SELECT * FROM [dbo].[F_SelectHD1]()").ToListAsync();

            }
        }


        // Get Bill Detail
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetBillDetail(int id)
        {
            var MaKhachHangParam = new SqlParameter("@MaKhachHang", id);

            return await _context.HoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_GetBill](@MaKhachHang)",
                    MaKhachHangParam).ToListAsync();
        }


        // Get Bill Paging
        public async Task<PagedResponse<List<HoaDon>>> GetBillPaging([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            // lấy data từ bảng HoaDon
            var pagedData = await _context.HoaDons
               .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
               .Take(validFilter.PageSize)
               .ToListAsync();

            // tổng số phần tử
            var totalRecords = await _context.HoaDons.CountAsync();

            // tổng số trang
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            var pageRespone = new PagedResponse<List<HoaDon>>(pagedData, validFilter.PageNumber, validFilter.PageSize, totalRecords, roundedTotalPages);

            return pageRespone;
        }


        // Put Ad Confirm
        public async Task<int> PutAdConfirm(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_AdConfir @MaHoaDon", MaHoaDonParam);
        }


        //Put Confirm Canceled
        public async Task<int> PutConfirmCanceled(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);
            return await _context.Database.ExecuteSqlRawAsync("exec Sp_CusConfir4 @MaHoaDon", MaHoaDonParam);
        }


        // Put Confirm Received
        public async Task<int> PutConfirmReceived(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_CusConfir3 @MaHoaDon", MaHoaDonParam);
        }
    }
}
