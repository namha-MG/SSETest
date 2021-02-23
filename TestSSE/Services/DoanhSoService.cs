using DataTables.AspNet.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TestSSE.Models;

namespace TestSSE.Services
{
    public class DoanhSoService
    {
        private DoanhSoEntities db = new DoanhSoEntities();
        /// <summary>
        /// Danh sách doanh số
        /// </summary>
        /// <param name="tungay"></param>
        /// <param name="denngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public IQueryable<tbl_Doanh_so> DanhSachDoanhSo(DateTime? tungay, DateTime? denngay, string ten)
        {
            var danhsach = db.tbl_Doanh_so.Where(x => (tungay != null ? DbFunctions.TruncateTime(x.ngay_ct) >= DbFunctions.TruncateTime(tungay) : true)
                                                   && (denngay != null ? DbFunctions.TruncateTime(x.ngay_ct) <= DbFunctions.TruncateTime(denngay) : true)
                                                   && (string.IsNullOrEmpty(ten) ? true : x.ten_kh.Contains(ten)));
            return danhsach;
        }
        /// <summary>
        /// danh sách doanh sô và request datatables
        /// </summary>
        /// <param name="request"></param>
        /// <param name="tungay"></param>
        /// <param name="denngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public IQueryable<tbl_Doanh_so> GetDataDoanhSo(IDataTablesRequest request, DateTime? tungay, DateTime? denngay, string ten)
        {
            var danhsach = DanhSachDoanhSo(tungay, denngay, ten);
            var Col = request.Columns?.Where(m => m.Sort != null).FirstOrDefault();
            if (Col != null)
            {
                switch (Col.Field)
                {
                    case "ngay_ct":
                        danhsach = Col.Sort.Direction == SortDirection.Ascending ?
                        danhsach.OrderBy(m => m.ngay_ct) : danhsach.OrderByDescending(m => m.ngay_ct);
                        break;
                    case "ten_kh":
                        danhsach = Col.Sort.Direction == SortDirection.Ascending ?
                        danhsach.OrderBy(m => m.ten_kh) : danhsach.OrderByDescending(m => m.ten_kh);
                        break;
                    case "doanh_so":
                        danhsach = Col.Sort.Direction == SortDirection.Ascending ?
                        danhsach.OrderBy(m => m.doanh_so) : danhsach.OrderByDescending(m => m.doanh_so);
                        break;
                    default:
                        danhsach = Col.Sort.Direction == SortDirection.Ascending ?
                           danhsach.OrderBy(m => m.ngay_ct) : danhsach.OrderByDescending(m => m.ngay_ct);
                        break;
                }
            }
            return danhsach;
        }
        /// <summary>
        /// get thông tin doanh số theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public tbl_Doanh_so ThongTinDoanhSo(int id)
        {
            return db.tbl_Doanh_so.Find(id);
        }
        /// <summary>
        /// Thêm mới hoặc chỉnh sửa doanh số
        /// </summary>
        /// <param name="doanhso"></param>
        /// <returns></returns>
        public tbl_Doanh_so InsertOrUpdate(tbl_Doanh_so doanhso)
        {
            if (doanhso == null) return null;
            tbl_Doanh_so dulieuCu = new tbl_Doanh_so();
            if (doanhso.id > 0)
            {
                var data = db.tbl_Doanh_so.Find(doanhso.id);
                data.ten_kh = doanhso.ten_kh;
                data.doanh_so = doanhso.doanh_so;
                var local = db.Set<tbl_Doanh_so>().Local.FirstOrDefault(f => f.id == doanhso.id);

                if (local != null)
                {
                    db.Entry(local).State = EntityState.Detached;
                }
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                return data;
            }
            else
            {
                doanhso.ngay_ct = DateTime.Now;
                db.tbl_Doanh_so.Add(doanhso);
                db.SaveChanges();
                return doanhso;
            }
        }
        /// <summary>
        /// Danh sách doanh số theo ngày
        /// </summary>
        /// <param name="ngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public IQueryable<tbl_Doanh_so> DanhSachDoanhSoTheoNgay(DateTime? ngay, string ten)
        {
            var danhsach = db.tbl_Doanh_so.Where(x => (ngay != null ? DbFunctions.TruncateTime(x.ngay_ct) == DbFunctions.TruncateTime(ngay) : true)
                                                   && (string.IsNullOrEmpty(ten) ? true : x.ten_kh.Contains(ten)));
            return danhsach;
        }
        /// <summary>
        /// Xóa doanh số
        /// </summary>
        /// <param name="doanhso"></param>
        /// <returns></returns>
        public bool Delete(int? id)
        {
            try
            {
                tbl_Doanh_so dSo = db.tbl_Doanh_so.Find(id);
                if (dSo == null) return false;
                db.tbl_Doanh_so.Remove(dSo);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }
        /// <summary>
        /// Danh sách doanh số tổng hợp
        /// </summary>
        /// <param name="tungay"></param>
        /// <param name="denngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public IEnumerable<tbl_Doanh_so> DanhSachDoanhSoTongHop(DateTime? tungay, DateTime? denngay, string ten)
        {
            var danhsach = (from ds in db.tbl_Doanh_so.Where(x => (tungay != null ? DbFunctions.TruncateTime(x.ngay_ct) >= DbFunctions.TruncateTime(tungay) : true)
                                                   && (denngay != null ? DbFunctions.TruncateTime(x.ngay_ct) <= DbFunctions.TruncateTime(denngay) : true)
                                                   && (string.IsNullOrEmpty(ten) ? true : x.ten_kh.Contains(ten)))
                           group ds by ds.ten_kh into dsGr select dsGr).ToList()
                           .Select(x => new tbl_Doanh_so
                           {
                               ten_kh = x.Key,
                               doanh_so = x.Sum(m => m.doanh_so)
                           }); 
            return danhsach;
        }
    }
}