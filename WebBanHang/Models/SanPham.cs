using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class SanPham
    {
        public SanPham()
        {
            BinhLuans = new HashSet<BinhLuan>();
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        public int MaSp { get; set; }
        public int? MaDanhMuc { get; set; }
        public string TenSp { get; set; }
        public string HinhAnh { get; set; }
        public string MoTa { get; set; }
        public decimal? DonGia { get; set; }
        public int? SoLuongCon { get; set; }
        public string Anh1 { get; set; }
        public string Anh2 { get; set; }
        public string Anh3 { get; set; }
        public string ChiTietSanPham { get; set; }

        public virtual DanhMuc MaDanhMucNavigation { get; set; }
        public virtual ICollection<BinhLuan> BinhLuans { get; set; }
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    }
}
