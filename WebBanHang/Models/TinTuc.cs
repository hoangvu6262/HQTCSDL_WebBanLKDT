using System;
using System.Collections.Generic;

#nullable disable

namespace WebBanHang.Models
{
    public partial class TinTuc
    {
        public int MaTinTuc { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string HinhAnh { get; set; }
        public DateTime? Ngay { get; set; }
        public string TacGia { get; set; }
    }
}
