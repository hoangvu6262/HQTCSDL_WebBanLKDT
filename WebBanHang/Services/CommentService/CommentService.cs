using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.CommentService
{
    public class CommentService : ICommentService
    {
        private readonly WebBanHangContext _context;

        public CommentService(WebBanHangContext context)
        {
            _context = context;
        }

        public async Task<int> AddComment(BinhLuan insert)
        {
            var MaSPParam = new SqlParameter("@MaSP", insert.MaSp);
            var MaKHParam = new SqlParameter("@MaKhachHang", insert.MaKhachHang);
            var NoiDungParam = new SqlParameter("@NoiDungBinhLuan", insert.NoiDungBinhLuan);

             return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertBL @MaSP, @MaKhachHang, @NoiDungBinhLuan",
                    MaSPParam, MaKHParam, NoiDungParam);
        }

        public async Task<int> DeleteComment(int id)
        {
            var IdParam = new SqlParameter("@MaBL", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteBL @MaBL", IdParam);
        }

        public async Task<ActionResult<BinhLuan>> GetBinhLuan(int id)
        {
            return await _context.BinhLuans.FindAsync(id);
        }

        public async Task<ActionResult<IEnumerable<BinhLuan>>> GetBinhLuans()
        {
            return await _context.BinhLuans.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<BinhLuan>>> GetCommentsByProductId(int productId)
        {
            var MaSPParam = new SqlParameter("@MaSP", productId);

            return await _context.BinhLuans.FromSqlRaw("SELECT * FROM [dbo].[F_SelectBL] (@MaSP)", MaSPParam).ToListAsync();
        }
    }
}
