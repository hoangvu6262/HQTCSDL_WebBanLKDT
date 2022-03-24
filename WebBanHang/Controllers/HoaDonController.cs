using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;
using WebBanHang.Services.BillService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly IBillService _billservice;

        public HoaDonController(IBillService billservice)
        {
            _billservice = billservice;
        }

        // GET: api/HoaDon
        [HttpGet("GetAllBills")]
        public async Task<ActionResult<IEnumerable<HoaDon>>> GetAllBills()
        {
            return await _billservice.GetAllBills();
        }

        // GET: api/HoaDon/5
        [HttpGet("GetBillById/{id}")]
        public async Task<ActionResult<HoaDon>> GetBillById(int id)
        {
            var hoaDon = await _billservice.GetBillById(id);

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
            var hoaDon = await _billservice.GetBillDetail(id);
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
            var pageRespone = await _billservice.GetBillPaging(filter);

            return Ok(pageRespone);
        }


        // POST: thêm Hóa đơn - api/HoaDon/AddBill
        [HttpPost("AddBill")]
        public async Task<ActionResult<HoaDon>> AddBill(HoaDon insert)
        {
            await _billservice.AddBill(insert);

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

            await _billservice.CheckOutOrder(insert);

            return Ok("CheckOut Success.");

        }

        // DELETE: xóa Hóa Đơn - api/HoaDon/DeleteBill/id
        [HttpDelete("DeleteBill/{id}")]
        public async Task<ActionResult> DeleteBill(int id)
        {
            if (await _billservice.CheckMaHoaDon(id))
            {
                await _billservice.DeleteBill(id);
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
            if (await _billservice.CheckMaHoaDon(id))
            {
                await _billservice.PutConfirmReceived(id);
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
            if (await _billservice.CheckMaHoaDon(id))
            {
                await _billservice.PutConfirmCanceled(id);

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
            if (await _billservice.CheckMaHoaDon(id))
            {
                await _billservice.PutAdConfirm(id);

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
                return await _billservice.GetBillByStatus(status);
            }
            
        }
    }
}
