using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class KhachHang
    {
        public KhachHang()
        {
            BinhLuans = new HashSet<BinhLuan>();
            HoaDons = new HashSet<HoaDon>();
        }

        public int MaKhachHang { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public string AnhDaiDien { get; set; }
        public string Email { get; set; }
        public string Ten { get; set; }
        public string DiaChi { get; set; }
        public string Sdt { get; set; }
        public bool? IsAdmin { get; set; }

        public virtual ICollection<BinhLuan> BinhLuans { get; set; }
        public virtual ICollection<HoaDon> HoaDons { get; set; }
    }
}
