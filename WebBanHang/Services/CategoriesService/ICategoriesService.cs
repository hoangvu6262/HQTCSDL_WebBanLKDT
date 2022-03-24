using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Services.CategoriesService
{
    public interface ICategoriesService
    {
        // get all categories
        Task<ActionResult<IEnumerable<DanhMuc>>> GetAllCategories();

        // get category by id
        Task<ActionResult<DanhMuc>> GetCategoryById(int id);

        // get category detail by id
        Task<ActionResult<DanhMuc>> GetCategoryDetailById(int id);

        // add category
        Task<int> AddCategory(DanhMuc insert);

        // delete category
        Task<int> DeleteCategory(int id);

        // update category
        Task<int> UpdateCategory(int id, DanhMuc updateData);

        // category exist 
        bool CategoryExist(int id, DanhMuc data);
    }
}
