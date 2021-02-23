using DataTables.AspNet.Core;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestSSE.Models;
using TestSSE.Services;

namespace TestSSE.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// trang chủ
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Danh sách dữ liệu doanh số
        /// </summary>
        /// <param name="request"></param>
        /// <param name="ngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public JsonResult _DanhSachDoanhSo(IDataTablesRequest request, string ngay, string ten)
        {
            var xeploai = request.Start / request.Length + 1;
            DoanhSoService service = new DoanhSoService();
            string[] dsngay = ngay.Replace(" ", "").Split('-');
            var list = (dsngay != null && dsngay.Length == 2) ? service.GetDataDoanhSo(request, ToDate(dsngay[0]), ToDate(dsngay[1]), ten)
                                                              : service.GetDataDoanhSo(request, null, null, ten);
            var ds = list.ToPagedList(xeploai, request.Length);
            return Json(new
            {
                draw = request.Draw,
                data = ds.Select(a => new
                {
                    a.id,
                    a.ngay_ct,
                    a.ten_kh,
                    a.doanh_so
                }).ToList(),
                recordsTotal = ds.TotalItemCount,
                recordsFiltered = ds.TotalItemCount
            }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// View Thông tin doanh số
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult _ThongTinDoanhSo(int? id)
        {
            tbl_Doanh_so _ds = new tbl_Doanh_so();
            DoanhSoService _service = new DoanhSoService();
            if (id != null)
            {
                _ds = _service.ThongTinDoanhSo((int)id);
            }
            return PartialView(_ds);
        }
        /// <summary>
        /// Lưu doanh số
        /// </summary>
        /// <param name="doanhso"></param>
        /// <returns></returns>
        public JsonResult LuuThongTin(tbl_Doanh_so doanhso)
        {

            DoanhSoService services = new DoanhSoService();
            var data = services.InsertOrUpdate(doanhso);
            return Json(new { data = data != null }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// Xóa doanh số
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult XoaDoanhSo(int? id)
        {

            DoanhSoService services = new DoanhSoService();
            var data = services.Delete(id);
            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }
        #region Chart
        /// <summary>
        /// Lấy dữ liệu chart theo ngày
        /// </summary>
        /// <param name="ngay"></param>
        /// <param name="ten"></param>
        /// <returns></returns>
        public JsonResult GetDataChartByTime(string ngay, string ten)
        {

            DoanhSoService services = new DoanhSoService();
            string[] dsngay = ngay.Replace(" ", "").Split('-');
            List<tbl_Doanh_so> dsDoanhSo = new List<tbl_Doanh_so>();
            for (DateTime dt = ToDate(dsngay[0]).Date; dt.Date <= ToDate(dsngay[1]).Date; dt = dt.AddDays(1))
            {
                var list = services.DanhSachDoanhSoTheoNgay(dt, ten).ToList();
                tbl_Doanh_so dSo = new tbl_Doanh_so();
                dSo.doanh_so = (list != null && list.Count > 0) ? list.Sum(x => x.doanh_so == null ? 0 : (decimal)x.doanh_so) : 0;
                dSo.ngay_ct = dt;
                dsDoanhSo.Add(dSo);
            }
            return Json(new { doanhso = dsDoanhSo }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDataChartByCus(string ngay, string ten)
        {

            DoanhSoService services = new DoanhSoService();
            string[] dsngay = ngay.Replace(" ", "").Split('-');
            var list = (dsngay != null && dsngay.Length == 2) ? services.DanhSachDoanhSoTongHop(ToDate(dsngay[0]), ToDate(dsngay[1]), ten)
                                                              : services.DanhSachDoanhSoTongHop(null, null, ten);
            return Json(new { doanhso = list.ToList() }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult _DialogChart()
        {
            return PartialView();
        }
        #endregion
        #region Helper
        /// <summary>
        /// chuyển string thành date
        /// </summary>
        /// <param name="inputValue"></param>
        /// <returns></returns>
        public static DateTime ToDate(string inputValue)
        {
            DateTime dtmReturnValue = new DateTime(1900, 1, 1);
            if (!string.IsNullOrEmpty(inputValue))
            {
                DateTime.TryParse(ddmmyyyy_to_mmddyyyy(inputValue), out dtmReturnValue);
            }
            return dtmReturnValue;
        }
        /// <summary>
        /// chuyển định dạng date từ ngày/tháng/năm sang tháng/ngày/năm
        /// </summary>
        /// <param name="strValue"></param>
        /// <returns></returns>
        public static string ddmmyyyy_to_mmddyyyy(string strValue)
        {
            if (strValue != "")
            {
                string[] strArray = strValue.Split(new char[] { '/' });
                string d = strArray[0];
                string m = strArray[1];
                string y = strArray[2];
                return (y + "/" + m + "/" + d);
            }
            return "";
        }
        #endregion
    }
}