using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;
using WebBanHang.Models.Pagination;

namespace WebBanHang.Services.ProductsService
{
    public interface IProductsService
    {
        // get all product
        Task<ActionResult<IEnumerable<F_GetProducts>>> GetSanPhams();

        // get product
        Task<ActionResult<SanPham>> GetSanPham(int id);

        // get product detail
        Task<ActionResult<SanPham>> GetProducDetail(int id);

        // get page list
        Task<PagedResponse<List<SanPham>>> GetProductsPaging([FromQuery] PaginationFilter filter);

        // search product
        Task<IEnumerable<SanPham>> SearchProductsByName(string searchString);


        // get product by category
        Task<IEnumerable<SanPham>> GetProductsByCategory(int categoryID);

        // get product vy category paging
        Task<PagedResponse<List<SanPham>>> GetProductsByCategoryPaging(int categoryID, [FromQuery] PaginationFilter filter);

        // add product
        Task<int> AddProduct(SanPham insert);

        // delete product
        Task<int> DeleteProduct(int id);

        // update product
        Task<int> UpdateProduct(int id, SanPham updateData);

        // check name of product exist diffrent id
        Task<bool> CheckNameOfProudctDiffId(int id, SanPham updateData);

        // check name of product exist 
        Task<bool> CheckNameOfProudct(SanPham insert);

        // get related product
        Task<ActionResult<IEnumerable<F_GetProducts>>> GetRelatedProducts(int MaSP, string TenDanhMuc);
    }
}
