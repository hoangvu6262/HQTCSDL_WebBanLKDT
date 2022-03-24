using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.NewsService
{
    public class NewsService : INewsService
    {
        private readonly WebBanHangContext _context;

        public NewsService(WebBanHangContext context)
        {
            _context = context;
        }

        //add news
        public async Task<int> AddNews(TinTuc insert)
        {
            var TieuDeParam = new SqlParameter("@TieuDe", insert.TieuDe);
            var NoiDungParam = new SqlParameter("@NoiDung", insert.NoiDung);
            var HinhAnhParam = new SqlParameter("@HinhAnh", insert.HinhAnh);
            var TacGiaParam = new SqlParameter("@TacGia", insert.TacGia);


            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertTT @TieuDe, @NoiDung, @HinhAnh, @TacGia", TieuDeParam, NoiDungParam, HinhAnhParam, TacGiaParam);
        }


        // check title
        public async Task<bool> CheckTitle(TinTuc insert)
        {
            if (await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == insert.TieuDe) != null)
            {

                return true;
            }

            return false;
        }

        //check title by id
        public async Task<bool> CheckTitleById(int id, TinTuc updateData)
        {
            if (await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == updateData.TieuDe) != null)
            {
                if (await _context.TinTucs.FirstOrDefaultAsync(tt => tt.TieuDe == updateData.TieuDe && tt.MaTinTuc == id) == null)
                {
                    return true;
                }

            }

            return false;
        }


        // delete news
        public async Task<int> DeleteNews(int id)
        {
            var IdParam = new SqlParameter("@MaTinTuc", id);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteDM @MaTinTuc", IdParam);
        }


        // Ge tNews By Author
        public async Task<IEnumerable<TinTuc>> GetNewsByAuthor(string searchString)
        {
            IQueryable<TinTuc> news = _context.TinTucs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                news = news.Where(n => n.TacGia.Contains(searchString));
            }

            return await news.ToListAsync();
        }


        //Get News By Id
        public async Task<ActionResult<TinTuc>> GetNewsById(int id)
        {
            return await _context.TinTucs.FindAsync(id);

        }


        //Get News By Title
        public async Task<IEnumerable<TinTuc>> GetNewsByTitle(string searchString)
        {
            IQueryable<TinTuc> news = _context.TinTucs;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                news = news.Where(n => n.TieuDe.Contains(searchString));
            }

            return await news.ToListAsync();
            
        }


        //Get News List
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetNewsList()
        {
            return await _context.TinTucs.FromSqlRaw("SELECT * FROM [dbo].[F_SelectTT]()").ToListAsync();
        }


        //Update News
        public async Task<int> UpdateNews(int id, TinTuc updateData)
        {
            var MaTinTucParam = new SqlParameter("@MaTinTuc", id);
            var TieuDeParam = new SqlParameter("@TieuDe", updateData.TieuDe);
            var NoiDungParam = new SqlParameter("@NoiDung", updateData.NoiDung);
            var HinhAnhParam = new SqlParameter("@HinhAnh", updateData.HinhAnh);
            var TacGiaParam = new SqlParameter("@TacGia", updateData.TacGia);

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateTT @MaTinTuc, @TieuDe, @NoiDung, @HinhAnh, @TacGia",
                MaTinTucParam, TieuDeParam, NoiDungParam, HinhAnhParam, TacGiaParam);
        }
    }
}
