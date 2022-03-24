using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.BillDetailService
{
    public interface IBillDetailService
    {
        // get all bill detail
        Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetAllBillDetail();

        // get bill detail by id
        Task<ActionResult<IEnumerable<ChiTietHoaDon>>> GetBillDetailByBillId(int MaHoaDon);

        // add bill detail
        Task<int> AddBillDetail(ChiTietHoaDon insert);
    }
}
