using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.ProductsService
{
    public class ProductsService : IProductsService
    {
        private readonly WebBanHangContext _context;

        public ProductsService(WebBanHangContext context)
        {
            _context = context;
        }

        public async Task<int> AddProduct(SanPham insert)
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

            return await _context.Database.ExecuteSqlRawAsync("exec Sp_InsertSP @MaDanhMuc, @TenSP, @HinhAnh, @MoTa, @DonGia, @SoLuongCon, @Anh1, @Anh2, @Anh3",
                    MaDanhMucSPParam, TenSPParam, HinhAnhParam, MoTaParam, DonGiaParam, SoLuongConParam, Anh1Param, Anh2Param, Anh3Param);
        }

        public async Task<bool> CheckNameOfProudct(SanPham insert)
        {
            var checkProduct = await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == insert.TenSp);

            if(checkProduct == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> CheckNameOfProudctDiffId(int id, SanPham updateData)
        {
            if (await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == updateData.TenSp) != null)
            {
                if (await _context.SanPhams.FirstOrDefaultAsync(c => c.TenSp == updateData.TenSp && c.MaSp == id) == null)
                {
                    return true;
                }

            }

            return false;
        }

        public async Task<int> DeleteProduct(int id)
        {
            var IdParam = new SqlParameter("@MaSP", id);

            return  await _context.Database.ExecuteSqlRawAsync("exec Sp_DeleteSP @MaSP", IdParam);
        }

        public async Task<ActionResult<SanPham>> GetProducDetail(int id)
        {
            //Eager Loading
            return await _context.SanPhams
                                          .Include(product => product.BinhLuans)
                                          .Include(product => product.ChiTietHoaDons)
                                          .Where(product => product.MaSp == id)
                                          .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<SanPham>> GetProductsByCategory(int categoryID)
        {
            return await _context.SanPhams.Where(product => product.MaDanhMuc == categoryID).ToListAsync();
        }

        public async Task<PagedResponse<List<SanPham>>> GetProductsByCategoryPaging(int categoryID, [FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            // lấy data từ bảng SanPham
            var pagedData = await _context.SanPhams
               .Where(product => product.MaDanhMuc == categoryID)
               .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
               .Take(validFilter.PageSize)
               .ToListAsync();

            // tổng số phần tử
            var totalRecords = await _context.SanPhams.Where(product => product.MaDanhMuc == categoryID).CountAsync();

            // tổng số trang
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            var pageRespone = new PagedResponse<List<SanPham>>(pagedData, validFilter.PageNumber, validFilter.PageSize, totalRecords, roundedTotalPages);

            return pageRespone;
        }

        public async Task<PagedResponse<List<SanPham>>> GetProductsPaging([FromQuery] PaginationFilter filter)
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

            return pageRespone;
        }

        public async Task<ActionResult<IEnumerable<F_GetProducts>>> GetRelatedProducts(int MaSP, string TenDanhMuc)
        {
            var MaSPParam = new SqlParameter("@MaSP", MaSP);
            var TenDanhMucParam = new SqlParameter("@TenDanhMuc", TenDanhMuc);

            return await _context.F_GetProducts.FromSqlRaw("SELECT * FROM [dbo].[F_SPwithsameDM](@MaSP, @TenDanhMuc)"
                , MaSPParam, TenDanhMucParam).ToListAsync();
        }

        public async Task<ActionResult<SanPham>> GetSanPham(int id)
        {
            return await _context.SanPhams.FindAsync(id);
        }

        public async Task<ActionResult<IEnumerable<F_GetProducts>>> GetSanPhams()
        {
            return await _context.F_GetProducts.FromSqlRaw("SELECT * FROM [dbo].[F_SelectSP]()").ToListAsync();
        }

        public async Task<IEnumerable<SanPham>> SearchProductsByName(string searchString)
        {
            IQueryable<SanPham> product = _context.SanPhams;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                product = product.Where(prod => prod.TenSp.Contains(searchString));
            }


            return await product.ToListAsync();
        }

        public async Task<int> UpdateProduct(int id, SanPham updateData)
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


            return await _context.Database.ExecuteSqlRawAsync("exec Sp_UpdateSP @MaSP, @MaDanhMuc, @TenSP, @HinhAnh, @MoTa, @DonGia, @SoLuongCon, @Anh1, @Anh2, @Anh3",
                    MaSPParam, MaDanhMucSPParam, TenSPParam, HinhAnhParam, MoTaParam, DonGiaParam, SoLuongConParam, Anh1Param, Anh2Param, Anh3Param);
        }
    }
}
