using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class HoaDon
    {
        public HoaDon()
        {
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        public int MaHoaDon { get; set; }
        public int? MaKhachHang { get; set; }
        public decimal? TongTien { get; set; }
        public DateTime? ThoiGian { get; set; }
        public DateTime? CapNhat { get; set; }
        public byte? TinhTrang { get; set; }

        public virtual KhachHang MaKhachHangNavigation { get; set; }
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    }
}
