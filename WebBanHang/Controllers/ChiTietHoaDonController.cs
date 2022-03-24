using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Services.BillDetailService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHoaDonController : ControllerBase
    {
        private readonly IBillDetailService _billdetailservice;

        public ChiTietHoaDonController(IBillDetailService billdetailservice)
        {
            _billdetailservice = billdetailservice;
        }

        // GET: api/ChiTietHoaDon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetAllBillDetail()
        {
            return await _billdetailservice.GetAllBillDetail();
        }

        // GET: api/ChiTietHoaDon/GetBillDetailByBillId
        [HttpGet("GetBillDetailByBillId")]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetBillDetailByBillId(int MaHoaDon)
        {
            var chiTietHoaDon = await _billdetailservice.GetBillDetailByBillId(MaHoaDon);

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
            await _billdetailservice.AddBillDetail(insert);

            return Ok("Add Bill Detail Success");

        }

        
    }
}
