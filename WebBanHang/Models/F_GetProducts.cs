using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebBanHang.Models
{
    public class F_GetProducts
    {
        [Key]
        public int MaSp { get; set; }
        public string TenDanhMuc { get; set; }
        public string TenSp { get; set; }
        public string HinhAnh { get; set; }
        public string MoTa { get; set; }
        public decimal? DonGia { get; set; }
        public int? SoLuongCon { get; set; }
        public string Anh1 { get; set; }
        public string Anh2 { get; set; }
        public string Anh3 { get; set; }
        public string ChiTietSanPham { get; set; }
    }
}
