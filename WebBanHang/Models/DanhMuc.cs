using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class DanhMuc
    {
        public DanhMuc()
        {
            SanPhams = new HashSet<SanPham>();
        }

        public int MaDanhMuc { get; set; }
        public string TenDanhMuc { get; set; }

        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
