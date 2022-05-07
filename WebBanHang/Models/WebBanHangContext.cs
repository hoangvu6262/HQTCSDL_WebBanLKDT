﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebBanHang.Models
{
    public partial class WebBanHangContext : DbContext
    {
        public WebBanHangContext()
        {
        }

        public WebBanHangContext(DbContextOptions<WebBanHangContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BinhLuan> BinhLuans { get; set; }
        public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }
        public virtual DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        public virtual DbSet<DanhMuc> DanhMucs { get; set; }
        public virtual DbSet<GioHang> GioHangs { get; set; }
        public virtual DbSet<HoaDon> HoaDons { get; set; }
        public virtual DbSet<KhachHang> KhachHangs { get; set; }
        public virtual DbSet<SanPham> SanPhams { get; set; }
        public virtual DbSet<TinTuc> TinTucs { get; set; }

        public virtual DbSet<F_GetProducts> F_GetProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=DESKTOP-QEN4LJI; Database=WebBanHang;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<BinhLuan>(entity =>
            {
                entity.HasKey(e => e.MaBl);

                entity.ToTable("BinhLuan");

                entity.Property(e => e.MaBl).HasColumnName("MaBL");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.Property(e => e.NoiDungBinhLuan).HasMaxLength(250);

                entity.Property(e => e.ThoiGian).HasColumnType("datetime");

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.BinhLuans)
                    .HasForeignKey(d => d.MaKhachHang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BinhLuan__MaKhac__33D4B598");

                entity.HasOne(d => d.MaSpNavigation)
                    .WithMany(p => p.BinhLuans)
                    .HasForeignKey(d => d.MaSp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BinhLuan__MaSP__34C8D9D1");
            });

            modelBuilder.Entity<ChiTietGioHang>(entity =>
            {
                entity.HasKey(e => e.MaCtgh);

                entity.ToTable("ChiTietGioHang");

                entity.Property(e => e.MaCtgh).HasColumnName("MaCTGH");

                entity.Property(e => e.DonGia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.HasOne(d => d.MaGioHangNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.MaGioHang)
                    .HasConstraintName("FK__ChiTietGi__MaGio__540C7B00");

                entity.HasOne(d => d.MaSpNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.MaSp)
                    .HasConstraintName("FK__ChiTietGio__MaSP__531856C7");
            });

            modelBuilder.Entity<ChiTietHoaDon>(entity =>
            {
                entity.HasKey(e => e.MaCthd);

                entity.ToTable("ChiTietHoaDon");

                entity.Property(e => e.MaCthd).HasColumnName("MaCTHD");

                entity.Property(e => e.DonGia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.HasOne(d => d.MaHoaDonNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaHoaDon)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ChiTietHo__MaHoa__32E0915F");

                entity.HasOne(d => d.MaSpNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaSp)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ChiTietHoa__MaSP__31EC6D26");
            });

            modelBuilder.Entity<DanhMuc>(entity =>
            {
                entity.HasKey(e => e.MaDanhMuc);

                entity.ToTable("DanhMuc");

                entity.Property(e => e.TenDanhMuc).HasMaxLength(100);
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.HasKey(e => e.MaGioHang);

                entity.ToTable("GioHang");

                entity.Property(e => e.MaGioHang).ValueGeneratedNever();

                entity.Property(e => e.CapNhat).HasColumnType("datetime");

                entity.Property(e => e.ThoiGian).HasColumnType("datetime");

                entity.Property(e => e.TongTien).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.GioHangs)
                    .HasForeignKey(d => d.MaKhachHang)
                    .HasConstraintName("FK__GioHang__MaKhach__5224328E");
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon);

                entity.ToTable("HoaDon");

                entity.Property(e => e.CapNhat).HasColumnType("datetime");

                entity.Property(e => e.ThoiGian).HasColumnType("datetime");

                entity.Property(e => e.TongTien).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.HoaDons)
                    .HasForeignKey(d => d.MaKhachHang)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__HoaDon__MaKhachH__300424B4");
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.HasKey(e => e.MaKhachHang);

                entity.ToTable("KhachHang");

                entity.Property(e => e.DiaChi).HasMaxLength(250);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(32)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Sdt)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SDT")
                    .IsFixedLength(true);

                entity.Property(e => e.Ten).HasMaxLength(50);

                entity.Property(e => e.TenDangNhap)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.HasKey(e => e.MaSp);

                entity.ToTable("SanPham");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.Property(e => e.DonGia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TenSp)
                    .HasMaxLength(50)
                    .HasColumnName("TenSP");

                entity.HasOne(d => d.MaDanhMucNavigation)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.MaDanhMuc)
                    .HasConstraintName("FK__SanPham__MaDanhM__30F848ED");
            });

            modelBuilder.Entity<TinTuc>(entity =>
            {
                entity.HasKey(e => e.MaTinTuc);

                entity.ToTable("TinTuc");

                entity.Property(e => e.Ngay).HasColumnType("datetime");

                entity.Property(e => e.NoiDung).IsRequired();

                entity.Property(e => e.TacGia).HasMaxLength(50);

                entity.Property(e => e.TieuDe).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
