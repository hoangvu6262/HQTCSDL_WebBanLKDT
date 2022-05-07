using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.BillService
{
    public interface IBillService
    {
        // get all bills
        Task<ActionResult<IEnumerable<HoaDon>>> GetAllBills();

        // get bill by id
        Task<ActionResult<HoaDon>> GetBillById(int id);

        // get bill detail
        Task<ActionResult<IEnumerable<HoaDon>>> GetBillDetail(int id);

        // get bills paging
        Task<PagedResponse<List<HoaDon>>> GetBillPaging([FromQuery] PaginationFilter filter);

        // add bill
        Task<int> AddBill(HoaDon insert);

        // delete bill
        Task<int> DeleteBill(int id);

        //  comfirm recieved
        Task<int> PutConfirmReceived(int id);

        // comfirm cancled
        Task<int> PutConfirmCanceled(int id);

        // admin comfirm
        Task<int> PutAdConfirm(int id);

        // check MaHoaDon
        Task<bool> CheckMaHoaDon(int MaHoaDon);

        // get Bill by status
        Task<ActionResult<IEnumerable<HoaDon>>> GetBillByStatus(int status);

        // check out order
        Task<int> CheckOutOrder(HoaDon insert);

        // get auto HoaDonID
        Task<AutoId> GetAutoHoaDonID();

        // upadte auto HoaDonID
        Task<int> UpadteAutoHoaDonID(string IdName, int autoHoaDonID);

        // add bill detail
        Task<int> AddBillDetail(int? MaSp, int id, int? SoLuong, decimal? DonGia);

    }
}
