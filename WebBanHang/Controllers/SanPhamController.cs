using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;
using WebBanHang.Services.ProductsService;

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly IProductsService _productservice;

        public SanPhamController(IProductsService productservice)
        {
            _productservice = productservice;
        }

        // GET: api/SanPham/GetAllProducts
        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<IEnumerable<F_GetProducts>>> GetSanPhams()
        {
            return await _productservice.GetSanPhams();
        }


        // GET: api/SanPham/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPham>> GetSanPham(int id)
        {
            var sanPham = await _productservice.GetSanPham(id);

            if (sanPham == null)
            {
                return NotFound();
            }

            return sanPham;
        }

        // GET: Lấy thông tin chi tiết sản phẩm - api/SanPham/GetProductsDetail/5
        [HttpGet("GetProductsDetail/{id}")]
        public async Task<ActionResult<SanPham>> GetProducDetail(int id)
        {
            var sanPham = await _productservice.GetProducDetail(id);

            if (sanPham == null)
            {
                return NotFound("Product Not Found!");
            }

            return sanPham;
        }

        // GET: Lấy danh sách san pham phân trang - /api/KhachHang/GetProductsPagining?PageNumber=1&PageSize=10
        [HttpGet("GetProductsPagining")]
        public async Task<IActionResult> GetProductsPaging([FromQuery] PaginationFilter filter)
        {
            var pageRespone = await _productservice.GetProductsPaging(filter);

            return Ok(pageRespone);
        }

        // GET: Tìm kiếm Sản Phẩm theo tên - api/KhachHang/SearchProductsByName?searchString=u
        [HttpGet("SearchProductsByName")]
        public async Task<IEnumerable<SanPham>> SearchProductsByName(string searchString)
        {
            return await _productservice.SearchProductsByName(searchString);
        }


        // GET: Lấy danh Sản Phẩm theo Danh Mục Sản Phẩm - api/SanPham/GetProductsByCategory?category=
        [HttpGet("GetProductsByCatagory")]
        public async Task<IEnumerable<SanPham>> GetProductsByCategory(int categoryID)
        {

            var products = await _productservice.GetProductsByCategory(categoryID);

            return products;
        }

        // GET: Lấy danh Sản Phẩm theo Danh Mục Sản Phẩm - api/SanPham/GetProductsByCategoryPaging?category=
        [HttpGet("GetProductsByCategoryPaging")]
        public async Task<ActionResult> GetProductsByCategoryPaging(int categoryID, [FromQuery] PaginationFilter filter)
        {
            var pageRespone = await _productservice.GetProductsByCategoryPaging(categoryID, filter);

            return Ok(pageRespone);
        }

        // POST: thêm sản phẩm - api/SanPham/AddProduct
        [HttpPost("AddProduct")]
        public async Task<ActionResult<SanPham>> AddProduct(SanPham insert)
        {
            var khachHang = await _productservice.CheckNameOfProudct(insert);

            if (khachHang)
            {
                return BadRequest("Product was Existed!!");
            }
            else
            {
                await _productservice.AddProduct(insert);

                return Ok("add success");
            }

        }

        // DELETE: xóa sản phẩm - api/sanpham/DeleteProduct/id
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            await _productservice.DeleteProduct(id);

            return Ok("Delete success!");
        }


        [HttpPut("UpdateProduct/{id}")]
        public async Task<ActionResult> UpdateProduct(int id, SanPham updateData)
        {
            var product = await _productservice.CheckNameOfProudctDiffId(id, updateData);

            if (product)
            {
                return BadRequest("Product was existed!");
            }

            await _productservice.UpdateProduct(id, updateData);

            return Ok("Update success.");

        }

        // GET: api/SanPham/GetRelatedProducts
        [HttpGet("GetRelatedProducts")]
        public async Task<ActionResult<IEnumerable<F_GetProducts>>> GetRelatedProducts(int MaSP, string TenDanhMuc)
        {
            var relatedProducts = await _productservice.GetRelatedProducts(MaSP, TenDanhMuc);

            if (relatedProducts == null)
            {
                return NotFound("Not Found Related Products!");
            }

            return relatedProducts;
        }

    }
}
