using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class ChiTietGioHang
    {
        public int MaCtgh { get; set; }
        public int? MaSp { get; set; }
        public int? MaGioHang { get; set; }
        public int? SoLuong { get; set; }
        public decimal? DonGia { get; set; }

        public virtual GioHang MaGioHangNavigation { get; set; }
        public virtual SanPham MaSpNavigation { get; set; }
    }
}
