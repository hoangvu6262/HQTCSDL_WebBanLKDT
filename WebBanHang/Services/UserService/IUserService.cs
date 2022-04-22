using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.UserService
{
    public interface IUserService
    {
        // get all user
        Task<ActionResult<IEnumerable<KhachHang>>> GetAllCustomors();

        // get customor detail
        Task<ActionResult<KhachHang>> GetCustomorDetail(int id);

        // get customor info by account
        Task<ActionResult<IEnumerable<KhachHang>>> GetCustomor(string tenDangNhap);

        // get customor list pagination
        Task<PagedResponse<List<KhachHang>>> GetCustomorsPagining([FromQuery] PaginationFilter filter);

        // search customor by name
        Task<IEnumerable<KhachHang>> SearchCustomorsByName(string searchString);

        // add customor
        Task<int> AddCustomor(KhachHang insert);

        // delete customor
        Task<int> DeleteCustomor(int id);

        // update customor
        Task<int> UpdateCustomor(int id, KhachHang updateData);

        // get customor login token
        Task<object> GetCustomorLoginToken(KhachHang userData);

        // get admin login token
        Task<string> GetAdminLoginToken(KhachHang userData);

        // set admin role
        Task<int> SetAdminRole(int maKhachHang);

        // check tenDangNhap exist
        Task<KhachHang> CheckAcountExist(KhachHang insert);

        // check email exist
        Task<bool> CheckEmailExist(int id, KhachHang updateData);


        // check tenDangNhap exist != id
        Task<bool> CheckAcountExistDiffId(int id, KhachHang updateData);

        // check id exist
        Task<KhachHang> CheckIdExist(int id);

        //check account and password
        Task<KhachHang> CheckAccPass(KhachHang insert);
    }
}
