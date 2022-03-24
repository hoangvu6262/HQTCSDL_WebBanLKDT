using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.CategoriesService
{
    public class CategoriesService : ICategoriesService
    {
        private readonly WebBanHangContext _context;

        public CategoriesService(WebBanHangContext context)
        {
            _context = context;
        }

        public async Task<int> AddCategory(DanhMuc insert)
        {
            var TenDMParam = new SqlParameter("@TenDanhMuc", insert.TenDanhMuc);
            var IconDanhMuc = new SqlParameter("@IconDanhMuc", insert.IconDanhMuc);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertDM @TenDanhMuc, @IconDanhMuc",
                    TenDMParam, IconDanhMuc);

        }

        public bool CategoryExist(int id, DanhMuc data)
        {
            if ( _context.DanhMucs.FirstOrDefaultAsync(d => d.TenDanhMuc == data.TenDanhMuc) != null)
            {
                if (_context.DanhMucs.FirstOrDefaultAsync(d => d.TenDanhMuc == data.TenDanhMuc && d.MaDanhMuc == id) == null)
                {
                    return true;
                }

            }

            return false;
        }

        public async Task<int> DeleteCategory(int id)
        {
            var IdParam = new SqlParameter("@MaDanhMuc", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteDM @MaDanhMuc", IdParam);
        }

        public async Task<ActionResult<IEnumerable<DanhMuc>>> GetAllCategories()
        {
            return await _context.DanhMucs.FromSqlRaw("SELECT * FROM [dbo].[F_SelectDM]()").ToListAsync();
        }

        public async Task<ActionResult<DanhMuc>> GetCategoryById(int id)
        {
            return await _context.DanhMucs.FindAsync(id);
        }

        public async Task<ActionResult<DanhMuc>> GetCategoryDetailById(int id)
        {
            return await _context.DanhMucs.Include(DM => DM.SanPhams)
                                          .Where(DM => DM.MaDanhMuc == id)
                                          .FirstOrDefaultAsync();
        }

        public async Task<int> UpdateCategory(int id, DanhMuc updateData)
        {
            var IdParam = new SqlParameter("@MaDanhMuc", id);
            var TenDMParam = new SqlParameter("@TenDanhMuc", updateData.TenDanhMuc);
            var IconDanhMuc = new SqlParameter("@IconDanhMuc", updateData.IconDanhMuc);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateDM @MaDanhMuc, @TenDanhMuc, @IconDanhMuc", IdParam, TenDMParam, IconDanhMuc);
        }

    }
}
