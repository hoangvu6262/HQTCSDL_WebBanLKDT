using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class ChiTietHoaDon
    {
        public int MaCthd { get; set; }
        public int? MaSp { get; set; }
        public int? MaHoaDon { get; set; }
        public int? SoLuong { get; set; }
        public decimal? DonGia { get; set; }

        public virtual HoaDon MaHoaDonNavigation { get; set; }
        public virtual SanPham MaSpNavigation { get; set; }
    }
}
