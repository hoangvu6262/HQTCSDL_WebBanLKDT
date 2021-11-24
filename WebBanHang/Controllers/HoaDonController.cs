﻿using System;
using System.Collections.Generic;
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
    public class HoaDonController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public HoaDonController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/HoaDon
        [HttpGet("GetAllBills")]
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetAllBills()
        {
            return await _context.HoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_SelectHD]()").ToListAsync();
        }

        // GET: api/HoaDon/5
        [HttpGet("GetBillById/{id}")]
        public async Task<ActionResult<HoaDon>> GetBillById(int id)
        {
            var hoaDon = await _context.HoaDons.FindAsync(id);

            if (hoaDon == null)
            {
                return NotFound();
            }

            return hoaDon;
        }

        // GET: Lấy thông tin chi tiết hóa đơn theo id -  api/HoaDon/GetBillDetail/5
        [HttpGet("GetBillDetail/{id}")]
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetBillDetail(int id)
        {
            //Eager Loading
            //var hoaDon = await _context.HoaDons
            //                              .Include(HD => HD.ChiTietHoaDons)
            //                              .Where(HD => HD.MaHoaDon == id)
            //                              .FirstOrDefaultAsync();
            var MaKhachHangParam = new SqlParameter("@MaKhachHang", id);

            var hoaDon = await _context.HoaDons.FromSqlRaw("SELECT * FROM[dbo].[F_GetBill](@MaKhachHang)",
                    MaKhachHangParam).ToListAsync();

            if (hoaDon == null)
            {
                return NotFound("Custom Not Found!");
            }

            return hoaDon;
        }


        //GET: Lấy danh sách khách hàng phân trang - api/HoaDon/GetBillPaging?PageNumber=1&PageSize=10
        [HttpGet("GetBillPaging")]
        public async Task<IActionResult> GetBillPaging([FromQuery] PaginationFilter filter)
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

            return Ok(pageRespone);
        }


        // POST: thêm Hóa đơn - api/HoaDon/AddBill
        [HttpPost("AddBill")]
        public async Task<ActionResult<HoaDon>> AddBill(HoaDon insert)
        {
            var MaKhachHangParam = new SqlParameter("@MaKhachHang", insert.MaKhachHang);
            var TongTienParam = new SqlParameter("@TongTien", insert.TongTien);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertHD @MaKhachHang, @TongTien",
                    MaKhachHangParam, TongTienParam);

            return Ok("add success");

        }

        // POST: thêm Hóa đơn - api/HoaDon/CheckOutOrder
        [HttpPost("CheckOutOrder")]
        public async Task<ActionResult<HoaDon>> CheckOutOrder(HoaDon insert)
        {
            //var MaKhachHangParam = new SqlParameter("@MaKhachHang", insert.MaKhachHang);
            //var TongTienParam = new SqlParameter("@TongTien", insert.TongTien);

            //await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertHD @MaKhachHang, @TongTien",
            //        MaKhachHangParam, TongTienParam);

            //return Ok("add success");

            _context.HoaDons.Add(insert);
            await _context.SaveChangesAsync();

            return Ok("CheckOut Success.");

        }

        // DELETE: xóa Hóa Đơn - api/HoaDon/DeleteBill/id
        [HttpDelete("DeleteBill/{id}")]
        public async Task<ActionResult> DeleteBill(int id)
        {
            var IdParam = new SqlParameter("@MaHoaDon", id);

            if (await _context.HoaDons.FirstOrDefaultAsync(b => b.MaHoaDon == id) != null)
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteHD @MaHoaDon", IdParam);

                return Ok("Delete success!");
            }
            else
            {
                return BadRequest("Id is Invail.");
            }
                
        }

        // PUT: xác nhận khách hàng đã nhận dc hàng - api/HoaDon/PutConfirmReceived/{id}
        [HttpPut("PutConfirmReceived/{id}")]
        public async Task<ActionResult> PutConfirmReceived(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);

            if (await _context.HoaDons.FirstOrDefaultAsync(b => b.MaHoaDon == id) != null)
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_CusConfir3 @MaHoaDon", MaHoaDonParam);
                return Ok("Confirm success!");
            }
            else
            {
                return BadRequest("Id is Invail.");
            }
                
        }

        // PUT: xác nhận khách hàng đã hủy đơn hàng - api/HoaDon/PutConfirmCanceled/{id}
        [HttpPut("PutConfirmCanceled/{id}")]
        public async Task<ActionResult> PutConfirmCanceled(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);

            if (await _context.HoaDons.FirstOrDefaultAsync(b => b.MaHoaDon == id) != null)
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_CusConfir4 @MaHoaDon", MaHoaDonParam);

                return Ok("Confirm success!");
            }
            else
            {
                return BadRequest("Id is Invail.");
            }
                
        }

        //PUT: duyệt đơn hàng - api/HoaDon/PutAdConfirm/id
        [HttpPut("PutAdConfirm/{id}")]
        public async Task<ActionResult> PutAdConfirm(int id)
        {
            var MaHoaDonParam = new SqlParameter("@MaHoaDon", id);

            if (await _context.HoaDons.FirstOrDefaultAsync(b => b.MaHoaDon == id) != null)
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_AdConfir @MaHoaDon", MaHoaDonParam);

                return Ok("Confirm success!");
            }
            else
            {
                return BadRequest("Id is Invail.");
            }
            
        }

        // GET: Lấy danh sách hóa đơn theo status - api/HoaDon/GetBillByStatus
        [HttpGet("GetBillByStatus")]
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetBillByStatus(int status)
        {
            if (status < 0 || status > 4)
            {
                return BadRequest("Status is from 1 to 4.");
            }
            else
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
            
        }
    }
}
