using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Services.NewsService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TinTucController : ControllerBase
    {
        private readonly INewsService _newsservice;

        public TinTucController(INewsService newsservice)
        {
            _newsservice = newsservice;
        }

        // GET: api/TinTuc/GetNewsList
        [HttpGet("GetNewsList")]
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetNewsList()
        {
            return await _newsservice.GetNewsList();
        }

        // GET: api/TinTuc/GetNewsById/{id}
        [HttpGet("GetNewsById/{id}")]
        public async Task<ActionResult<TinTuc>> GetNewsById(int id)
        {
            var tinTuc = await _newsservice.GetNewsById(id);

            if (tinTuc == null)
            {
                return NotFound();
            }

            return tinTuc;
        }

        // GET: Tìm kiếm tin tức theo tiêu đề - api/tintuc/GetNewsByTitle
        [HttpGet("GetNewsByTitle")]
        public async Task<IEnumerable<TinTuc>> GetNewsByTitle(string searchString)
        {
            return await _newsservice.GetNewsByTitle(searchString);
        }

        // GET: Tìm kiếm tin tức theo nguoi viet- api/tintuc/GetNewsByAuthor
        [HttpGet("GetNewsByAuthor")]
        public async Task<IEnumerable<TinTuc>> GetNewsByAuthor(string searchString)
        {
            return await _newsservice.GetNewsByAuthor(searchString);
        }


        // POST: Thêm tin tức - api/TinTuc/AddNews
        [HttpPost("AddNews")]
        public async Task<ActionResult> AddNews(TinTuc insert)
        {
            var news = await _newsservice.CheckTitle(insert);

            if (news)
            {
                return BadRequest("News title was Exist.");
            }

            await _newsservice.AddNews(insert);

            return Ok("Add News Success!");
        }


        // DELETE: xóa Tin tức - api/TinTuc/DeleteNews/id
        [HttpDelete("DeleteNews/{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            await _newsservice.DeleteNews(id);

            return Ok("Delete News Success!");
        }

        // PUT: update Tin Tức - api/TinTuc/UpdateNews/{id}
        [HttpPut("UpdateNews/{id}")]
        public async Task<ActionResult> UpdateNews(int id, TinTuc updateData)
        {
            if (await _newsservice.CheckTitleById(id, updateData))
            {
                return BadRequest("News Title was Existed!");

            }

            await _newsservice.UpdateNews(id, updateData);

            return Ok("update News Success!");
        }
    }
}
