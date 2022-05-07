using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class GioHang
    {
        public GioHang()
        {
            ChiTietGioHangs = new HashSet<ChiTietGioHang>();
        }

        public int MaGioHang { get; set; }
        public int? MaKhachHang { get; set; }
        public decimal? TongTien { get; set; }
        public DateTime? ThoiGian { get; set; }
        public DateTime? CapNhat { get; set; }

        public virtual KhachHang MaKhachHangNavigation { get; set; }
        public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; }
    }
}
