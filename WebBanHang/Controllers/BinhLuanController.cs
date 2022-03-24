using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Services.CommentService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinhLuanController : ControllerBase
    {
        private readonly ICommentService _commetnservice;

        public BinhLuanController(ICommentService commetnservice)
        {
            _commetnservice = commetnservice;
        }

        // GET: api/BinhLuan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinhLuan>>> GetBinhLuans()
        {
            return await _commetnservice.GetBinhLuans();
        }

        // GET: api/BinhLuan/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BinhLuan>> GetBinhLuan(int id)
        {
            var binhLuan = await _commetnservice.GetBinhLuan(id);

            if (binhLuan == null)
            {
                return NotFound();
            }

            return binhLuan;
        }

        // GET: api/BinhLuan/GetCommentsByProductId
        [HttpGet("GetCommentsByProductId")]
        public async Task<ActionResult<IEnumerable<BinhLuan>>> GetCommentsByProductId(int productId)
        {
            var binhLuan = await _commetnservice.GetCommentsByProductId(productId);

            if (binhLuan == null)
            {
                return NotFound();
            }

            return binhLuan;
        }

        // POST: thêm bình luận - api/KhachHang/AddComment
        [HttpPost("AddComment")]
        public async Task<ActionResult<BinhLuan>> AddComment(BinhLuan insert)
        {
            await _commetnservice.AddComment(insert);

            return Ok("Add Comment Success");

        }

        // DELETE: xóa Danh mục - api/KhachHang/DeleteComment/id
        [HttpDelete("DeleteComment/{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            await _commetnservice.DeleteComment(id);

            return Ok("Delete Comment Success!");
        }

    }
}
