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

namespace WebBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly WebBanHangContext _context;

        public SanPhamController(WebBanHangContext context)
        {
            _context = context;
        }

        // GET: api/SanPham
        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetSanPhams()
        {
            return await _context.SanPhams.ToListAsync();
        }

        // GET: api/SanPham/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPham>> GetSanPham(int id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);

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
            //Eager Loading
            var sanPham = await _context.SanPhams
                                          .Include(product => product.BinhLuans)
                                          .Include(product => product.ChiTietHoaDons)
                                          .Where(product => product.MaSp == id)
                                          .FirstOrDefaultAsync();

            if (sanPham == null)
            {
                return NotFound("Product Not Found!");
            }

            return sanPham;
        }

        // GET: Lấy danh sách san pham phân trang - /api/KhachHang/GetProductsPagining?PageNumber=1&PageSize=10
        [HttpGet("GetProductsPagining")]
        public async Task<IActionResult> GetProductsPagining([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            // lấy data từ bảng SanPham
            var pagedData = await _context.SanPhams
               .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
               .Take(validFilter.PageSize)
               .ToListAsync();

            // tổng số phần tử
            var totalRecords = await _context.SanPhams.CountAsync();

            // tổng số trang
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            var pageRespone = new PagedResponse<List<SanPham>>(pagedData, validFilter.PageNumber, validFilter.PageSize, totalRecords, roundedTotalPages);

            return Ok(pageRespone);
        }

        // GET: Tìm kiếm Sản Phẩm theo tên - api/KhachHang/SearchProductsByName?searchString=u
        [HttpGet("SearchProductsByName")]
        public async Task<IEnumerable<SanPham>> SearchProductsByName(string searchString)
        {
            IQueryable<SanPham> product = _context.SanPhams;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                product = product.Where(prod => prod.TenSp.Contains(searchString));
            }


            return await product.ToListAsync();
        }


        // GET: Lấy danh Sản Phẩm theo Danh Mục Sản Phẩm - api/SanPham/GetProductsByCategory?category=
        [HttpGet("GetProductsByCatagory")]
        public async Task<IEnumerable<SanPham>> GetProductsByCategory(int categoryID)
        {
            var products = await _context.SanPhams.Where(product => product.MaDanhMuc == categoryID).ToListAsync();

            return products;
        }

        // POST: thêm sản phẩm - api/KhachHang/AddProduct
        [HttpPost("AddProduct")]
        public async Task<ActionResult<SanPham>> AddProduct(SanPham insert)
        {
            var MaDanhMucSPParam = new SqlParameter("@MaDanhMuc", insert.MaDanhMuc);
            var TenSPParam = new SqlParameter("@TenSP", insert.TenSp);
            var HinhAnhParam = new SqlParameter("@HinhAnh", insert.HinhAnh);
            var MoTaParam = new SqlParameter("@MoTa", insert.MoTa);
            var DonGiaParam = new SqlParameter("@DonGia", insert.DonGia);
            var SoLuongConParam = new SqlParameter("@SoLuongCon", insert.SoLuongCon);
            var Anh1Param = new SqlParameter("@Anh1", insert.Anh1);
            var Anh2Param = new SqlParameter("@Anh2", insert.Anh2);
            var Anh3Param = new SqlParameter("@Anh3", insert.Anh3);


            var khachHang = await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == insert.TenSp);

            if (khachHang != null)
            {
                return BadRequest("Product was Existed!!");
            }
            else
            {
                await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertSP @MaDanhMuc, @TenSP, @HinhAnh, @MoTa, @DonGia, @SoLuongCon, @Anh1, @Anh2, @Anh3",
                    MaDanhMucSPParam, TenSPParam, HinhAnhParam, MoTaParam, DonGiaParam, SoLuongConParam, Anh1Param, Anh2Param, Anh3Param);

                return Ok("add success");
            }

        }

        // DELETE: xóa sản phẩm - api/KhachHang/DeleteProduct/id
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<ActionResult> DeleteCustomor(int id)
        {
            var IdParam = new SqlParameter("@MaSP", id);

            await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteSP @MaSP", IdParam);

            return Ok("Delete success!");
        }


        [HttpPut("UpdateProduct/{id}")]
        public async Task<ActionResult> UpdateProduct(int id, SanPham updateData)
        {
            var MaSPParam = new SqlParameter("@MaSP", id);
            var MaDanhMucSPParam = new SqlParameter("@MaDanhMuc", updateData.MaDanhMuc);
            var TenSPParam = new SqlParameter("@TenSP", updateData.TenSp);
            var HinhAnhParam = new SqlParameter("@HinhAnh", updateData.HinhAnh);
            var MoTaParam = new SqlParameter("@MoTa", updateData.MoTa);
            var DonGiaParam = new SqlParameter("@DonGia", updateData.DonGia);
            var SoLuongConParam = new SqlParameter("@SoLuongCon", updateData.SoLuongCon);
            var Anh1Param = new SqlParameter("@Anh1", updateData.Anh1);
            var Anh2Param = new SqlParameter("@Anh2", updateData.Anh2);
            var Anh3Param = new SqlParameter("@Anh3", updateData.Anh3);


            if (await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == updateData.TenSp) != null)
            {
                if (await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == updateData.TenSp && c.MaSp == id) == null)
                {
                    return BadRequest("Product was Existed!");
                }

            }


            await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateSP @MaSP, @MaDanhMuc, @TenSP, @HinhAnh, @MoTa, @DonGia, @SoLuongCon, @Anh1, @Anh2, @Anh3",
                    MaSPParam, MaDanhMucSPParam, TenSPParam, HinhAnhParam, MoTaParam, DonGiaParam, SoLuongConParam, Anh1Param, Anh2Param, Anh3Param);
            return Ok("Update success!");


        }

    }
}
