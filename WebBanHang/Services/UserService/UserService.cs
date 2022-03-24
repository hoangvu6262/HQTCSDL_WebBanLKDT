using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.UserService
{
    public class UserService : IUserService 
    {
        private readonly WebBanHangContext _context;
        private readonly IConfiguration _configuration;

        public UserService(WebBanHangContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // AddCustomor
        public async Task<int> AddCustomor(KhachHang insert)
        {
            var TenParam = new SqlParameter("@Ten", insert.Ten);
            var TenDangNhapParam = new SqlParameter("@TenDangNhap", insert.TenDangNhap);
            var MatKhauParam = new SqlParameter("@MatKhau", insert.MatKhau);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertKH @Ten, @TenDangNhap, @MatKhau", TenParam, TenDangNhapParam, MatKhauParam);
        }

        // CheckAcountExist
        public async Task<KhachHang> CheckAcountExist(KhachHang insert)
        {
            return await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == insert.TenDangNhap);
        }

        //CheckAcountExistDiffId
        public async Task<bool> CheckAcountExistDiffId(int id, KhachHang updateData)
        {
            if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == updateData.TenDangNhap) != null)
            {
                if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == updateData.TenDangNhap && c.MaKhachHang == id) == null)
                {
                    return true;
                }

            }

            return false;
        }

        //CheckEmailExist
        public async Task<bool> CheckEmailExist(int id, KhachHang updateData)
        {
            if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.Email == updateData.Email) != null)
            {
                if (await _context.KhachHangs.FirstOrDefaultAsync(c => c.Email == updateData.Email && c.MaKhachHang == id) == null)
                {
                    return true;
                }
            }

            return false;
        }


        //CheckIdExist
        public async Task<KhachHang> CheckIdExist(int maKhachHang)
        {
            return await _context.KhachHangs.FirstOrDefaultAsync(c => c.MaKhachHang == maKhachHang);
        }


        //DeleteCustomor
        public async Task<int> DeleteCustomor(int id)
        {
            var IdParam = new SqlParameter("@MaKhachHang", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteKH @MaKhachHang", IdParam);
        }

        //GetAdminLoginToken
        public async Task<string> GetAdminLoginToken(KhachHang userData)
        {
            var user = await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == userData.TenDangNhap && c.MatKhau == userData.MatKhau);
            if (user != null && user.IsAdmin == true)
            {
                // Add CLaims
                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["JwtSettings:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("TenDangNhap", user.TenDangNhap),
                        new Claim("MatKhau", user.MatKhau),
                        new Claim("role", "Admin"),
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var tokenString = new JwtSecurityToken(_configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenString);

                return accessToken;
            }
            return null;
        }

        //GetAllCustomors
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetAllCustomors()
        {
            return await _context.KhachHangs.ToListAsync();
        }


        //GetCustomor
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetCustomor(string tenDangNhap)
        {
            var TenDangNhapParam = new SqlParameter("@TenDangNhap", tenDangNhap);

            return await _context.KhachHangs.FromSqlRaw("SELECT * FROM[dbo].[F_GetAccount](@TenDangNhap)",
                TenDangNhapParam).ToListAsync();
        }


        //GetCustomorDetail
        public async Task<ActionResult<KhachHang>> GetCustomorDetail(int id)
        {
            return await _context.KhachHangs
                                          .Include(kHang => kHang.BinhLuans)
                                          .Include(kHang => kHang.HoaDons)
                                          .Where(kHang => kHang.MaKhachHang == id)
                                          .FirstOrDefaultAsync();
        }


        //GetCustomorLoginToken
        public async Task<string> GetCustomorLoginToken(KhachHang userData)
        {
            var user = await _context.KhachHangs.FirstOrDefaultAsync(c => c.TenDangNhap == userData.TenDangNhap && c.MatKhau == userData.MatKhau);
            if (user != null)
            {
                // Add CLaims
                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["JwtSettings:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("TenDangNhap", user.TenDangNhap),
                        new Claim("MatKhau", user.MatKhau),
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                var tokenString = new JwtSecurityToken(_configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"], claims, expires: DateTime.UtcNow.AddDays(3), signingCredentials: signIn);

                var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenString);

                return accessToken;
            }
            return null;
        }


        //GetCustomorsPagining
        public async Task<PagedResponse<List<KhachHang>>> GetCustomorsPagining([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            // lấy data từ bảng KhachHang
            var pagedData = await _context.KhachHangs
               .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
               .Take(validFilter.PageSize)
               .ToListAsync();

            // tổng số phần tử
            var totalRecords = await _context.KhachHangs.CountAsync();

            // tổng số trang
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            var pageRespone = new PagedResponse<List<KhachHang>>(pagedData, validFilter.PageNumber, validFilter.PageSize, totalRecords, roundedTotalPages);

            return pageRespone;
        }

        //SearchCustomorsByName
        public async Task<IEnumerable<KhachHang>> SearchCustomorsByName(string searchString)
        {
            IQueryable<KhachHang> khachHang = _context.KhachHangs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                khachHang = khachHang.Where(kHang => kHang.TenDangNhap.Contains(searchString));
            }


            return await khachHang.ToListAsync(); ;
        }


        //SetAdminRole
        public async Task<int> SetAdminRole(int maKhachHang)
        {
            var MaKhachHangParam = new SqlParameter("@MaKhachHang", maKhachHang);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_SetAD @MaKhachHang", MaKhachHangParam);
        }


        //UpdateCustomor
        public async Task<int> UpdateCustomor(int id, KhachHang updateData)
        {
            var IdParam = new SqlParameter("@MaKhachHang", id);
            var TenParam = new SqlParameter("@Ten", updateData.Ten);
            var TenDangNhapParam = new SqlParameter("@TenDangNhap", updateData.TenDangNhap);
            var MatKhauParam = new SqlParameter("@MatKhau", updateData.MatKhau);
            var AnhDaiDienParam = new SqlParameter("@AnhDaiDien", updateData.AnhDaiDien);
            var EmailParam = new SqlParameter("@Email", updateData.Email);
            var DiaChiParam = new SqlParameter("@DiaChi", updateData.DiaChi);
            var SDTParam = new SqlParameter("@SDT", updateData.Sdt);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateKH @MaKhachHang, @TenDangNhap, @MatKhau, @AnhDaiDien, @Email, @Ten, @DiaChi, @SDT",
                    IdParam, TenDangNhapParam, MatKhauParam, AnhDaiDienParam, EmailParam, TenParam, DiaChiParam, SDTParam);
        }
    }
}
