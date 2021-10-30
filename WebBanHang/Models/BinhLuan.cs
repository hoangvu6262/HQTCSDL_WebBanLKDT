using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class BinhLuan
    {
        public int MaBl { get; set; }
        public int MaKhachHang { get; set; }
        public int MaSp { get; set; }
        public string NoiDungBinhLuan { get; set; }
        public DateTime? ThoiGian { get; set; }

        public virtual KhachHang MaKhachHangNavigation { get; set; }
        public virtual SanPham MaSpNavigation { get; set; }
    }
}
