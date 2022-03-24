using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
//using System.Data.SqlClient;
using System.Linq;
//using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;
using WebBanHang.Services.UserService;

namespace WebBanHang.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IUserService _userservice;
        
        public KhachHangController(IUserService userservice)
        {
            _userservice = userservice;
        }

        // GET: lấy danh sách khach hàng - api/KhachHang/GetAllCustoms
        //[Authorize(Roles = "Admin")]
        [HttpGet("GetAllCustomors")]
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetAllCustomors()
        {
            return await _userservice.GetAllCustomors();
        }

        // GET: Lấy thông tin chi tiết khách hàng theo id -  api/KhachHang/GetCustomorDetail/5
        [HttpGet("GetCustomorDetail/{id}")]
        public async Task<ActionResult<KhachHang>> GetCustomorDetail(int id)
        {
            //Eager Loading
            var khachHang = await _userservice.GetCustomorDetail(id);

            if (khachHang == null)
            {
                return NotFound("Custom Not Found!");
            }

            return khachHang;
        }

        // GET: Lấy thông tin khách hàng theo tenDangNhap - api/KhachHang/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetCustomor(string tenDangNhap)
        {
            var account = await _userservice.GetCustomor(tenDangNhap);
            
            if (account == null)
            {
                return NotFound("not found!");
            }

            return account;


        }

        //GET: Lấy danh sách khách hàng phân trang - api/KhachHang/GetCustomorsPagining?PageNumber=1&PageSize=10
        [HttpGet("GetCustomorsPagining")]
        public async Task<IActionResult> GetCustomorsPagining([FromQuery] PaginationFilter filter)
        {
            var pageRespone = await _userservice.GetCustomorsPagining(filter);

            return Ok(pageRespone);
        }

        // GET: Tìm kiếm khách hàng theo tên - api/KhachHang/SearchCustomsByName?searchString=u
        [HttpGet("SearchCustomorsByName")]
        public async Task<IEnumerable<KhachHang>> SearchCustomorsByName(string searchString)
        {
            return await _userservice.SearchCustomorsByName(searchString);
        }


        // POST: thêm khách hàng - api/KhachHang/AddCustomor   
        [HttpPost("AddCustomor")]
        public async Task<ActionResult<KhachHang>> AddCustomor(KhachHang insert)
        {
            var khachHang = await _userservice.CheckAcountExist(insert);

            if (khachHang != null)
            {
                return BadRequest("Account was Existed!!");
            }
            else
            {
                await _userservice.AddCustomor(insert);
                
                return Ok("add success"); 
            } 
            
        }

        // DELETE: xóa khách hàng - api/KhachHang/DeleteCustomor/id
        [HttpDelete("DeleteCustomor/{id}")]
        public async Task<ActionResult> DeleteCustomor(int id)
        {
            await _userservice.DeleteCustomor(id);

            return Ok("Delete success!");
        }


        [HttpPut("UpdateCustomor/{id}")]
        public async Task<ActionResult> UpdateCustomor(int id, KhachHang updateData)
        {
            if (await _userservice.CheckAcountExistDiffId(id,updateData))
            {
                return BadRequest("Account was existed!");
                
            }
            
            if(await _userservice.CheckEmailExist(id, updateData))
            {
                return BadRequest("Email was Existed!");
            }


            await _userservice.UpdateCustomor(id, updateData);
            return Ok("Update success!");


        }

        // POST: khach hang login - api/KhachHang/CustomorLogin
        [HttpPost("CustomorLogin")]
        public async Task<ActionResult> CustomorLogin(KhachHang userData)
        {
            if (userData != null && userData.TenDangNhap != null && userData.MatKhau != null)
            {
                var userToken = await _userservice.GetCustomorLoginToken(userData);
                if (userToken != null)
                {
                    return Ok(new { 
                        id = userData.MaKhachHang,
                        account = userData.TenDangNhap,
                        token = userToken
                    });
                }
                else
                {
                    //return BadRequest("Invalid credentials");
                    return BadRequest("Username or Password is incorrect!");
                }
            }
            else
            {
                return BadRequest("Please Enter Username and Password");
            }
        }


        // POST: Admin login - api/KhachHang/AdminLogin
        [HttpPost("AdminLogin")]
        public async Task<ActionResult> AdminLogin(KhachHang userData)
        {
            if (userData != null && userData.TenDangNhap != null && userData.MatKhau != null)
            {
                var adminToken = await _userservice.GetAdminLoginToken(userData);
                if (adminToken != null)
                {
                    return Ok(new
                    {
                        id = userData.MaKhachHang,
                        account = userData.TenDangNhap,
                        role = "Admin",
                        token = adminToken
                    });
                }
                else
                {
                    //return BadRequest("Invalid credentials");
                    return BadRequest("Username or Password is incorrect!");
                }
            }
            else
            {
                return BadRequest("Please Enter Username and Password");
            }
        }

        //PUT: quyền set admin - api/KhachHang/SetAdmin
        [HttpPut("SetAdmin")]
        public async Task<ActionResult> SetAdmin(int maKhachHang)
        {
            if (await _userservice.CheckIdExist(maKhachHang) == null)
            {
                return BadRequest("MaKhachHang is Invail.");
            }
            else
            {
                await _userservice.SetAdminRole(maKhachHang);
                return Ok("Set Admin Success.");
            }


        }

    }
}
