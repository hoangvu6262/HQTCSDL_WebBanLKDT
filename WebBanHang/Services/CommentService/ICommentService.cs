using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.CommentService
{
    public interface ICommentService
    {
        // get all comment
        Task<ActionResult<IEnumerable<BinhLuan>>> GetBinhLuans();

        // get comment by id
        Task<ActionResult<BinhLuan>> GetBinhLuan(int id);

        // get comment by product id
        Task<ActionResult<IEnumerable<BinhLuan>>> GetCommentsByProductId(int productId);

        // add comment
        Task<int> AddComment(BinhLuan insert);

        // delete comment
        Task<int> DeleteComment(int id);
    }
}
