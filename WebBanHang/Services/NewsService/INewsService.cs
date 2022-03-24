using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.NewsService
{
    public interface INewsService
    {
        // get all news
        Task<ActionResult<IEnumerable<TinTuc>>> GetNewsList();

        // get news
        Task<ActionResult<TinTuc>> GetNewsById(int id);

        // get news by title
        Task<IEnumerable<TinTuc>> GetNewsByTitle(string searchString);

        //get news by author
        Task<IEnumerable<TinTuc>> GetNewsByAuthor(string searchString);

        // add news
        Task<int> AddNews(TinTuc insert);

        // check title
        Task<bool> CheckTitle(TinTuc insert);

        // check ttile by id
        Task<bool> CheckTitleById(int id, TinTuc updateData);

        // delete News
        Task<int> DeleteNews(int id);

        // Update News
        Task<int> UpdateNews(int id, TinTuc updateData);
    }
}
