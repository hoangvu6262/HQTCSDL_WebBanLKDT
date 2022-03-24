using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Services.CategoriesService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private readonly ICategoriesService _repository;

        public DanhMucController(ICategoriesService repository)
        {
            _repository = repository;
        }

        // GET: api/DanhMuc/GetAllCategories
        [HttpGet("GetAllCategories")]
        public async Task<ActionResult<IEnumerable<DanhMuc>>> GetAllCategories()
        {
            return await _repository.GetAllCategories();
        }

        // GET: api/DanhMuc/5
        [HttpGet("GetCategoryById/{id}")]
        public async Task<ActionResult<DanhMuc>> GetCategoryById(int id)
        { 
            var danhMuc = await _repository.GetCategoryById(id);

            if (danhMuc == null)
            {
                return NotFound("Category Not Found!");
            }

            return danhMuc;
        }


        // GET: Lấy thông tin chi tiết Danh muc theo id -  api/DanhMuc/GetCategoryDetailById/5
        [HttpGet("GetCategoryDetailById/{id}")]
        public async Task<ActionResult<DanhMuc>> GetCategoryDetailById(int id)
        {
            //Eager Loading
            var danhMuc = await _repository.GetCategoryDetailById(id);

            if (danhMuc == null)
            {
                return NotFound("Category Not Found!");
            }

            return danhMuc;
        }

        // POST: thêm Danh mục - api/DanhMuc/AddCategory
        [HttpPost("AddCategory")]
        public async Task<ActionResult<DanhMuc>> AddCategory(DanhMuc insert)
        {
            await _repository.AddCategory(insert);

            return Ok("add category success");

        }

        // DELETE: xóa Danh mục - api/DanhMuc/DeleteCategory/id
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            await _repository.DeleteCategory(id);

            return Ok("Delete category success!");
        }

        // PUT: update danh mục - api/DanhMuc/UpdateCategory/{id}
        [HttpPut("UpdateCategory/{id}")]
        public async Task<ActionResult> UpdateCategory(int id, DanhMuc updateData)
        {
            // check category exist
            var checkCategoryExist = _repository.CategoryExist(id, updateData);

            if (checkCategoryExist)
            {
                await _repository.UpdateCategory(id, updateData);
                return Ok("update category success!");

            }
            return BadRequest("Category was Exist!");
        }

    }
}
