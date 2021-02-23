using System.Web;
using System.Web.Optimization;

namespace TestSSE
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.Add(new ScriptBundle("~/admin-lte/js").Include(
                      "~/AdminLTE/plugins/jquery/jquery.js",
                      "~/Scripts/jquery.validate.js",
                      "~/AdminLTE/plugins/popper/umd/popper.min.js",
                      "~/AdminLTE/plugins/jquery-ui/jquery-ui.min.js",
                      "~/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js",
                      "~/AdminLTE/plugins/bootstrap/js/bootstrap.min.js",
                      "~/AdminLTE/plugins/jsgrid/jsgrid.min.js",
                      "~/AdminLTE/plugins/sweetalert2/sweetalert2.min.js",
                      "~/AdminLTE/plugins/toastr/toastr.min.js",
                      "~/AdminLTE/plugins/chart.js/Chart.min.js",
                      "~/AdminLTE/plugins/jquery-knob/jquery.knob.min.js",
                      "~/AdminLTE/plugins/moment/moment.min.js",
                      "~/AdminLTE/plugins/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
                      "~/AdminLTE/plugins/daterangepicker/daterangepicker.js",
                      "~/AdminLTE/plugins/bootstrap-datepicker/dist/locales/bootstrap-datepicker.vi.min.js", // language for datepicker
                      "~/AdminLTE/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
                      "~/AdminLTE/plugins/summernote/summernote-bs4.min.js",
                      "~/AdminLTE/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
                      "~/AdminLTE/dist/js/adminlte.js",
                       "~/AdminLTE/plugins/select2/js/select2.full.js",
                        "~/AdminLTE/plugins/inputmask/jquery.inputmask.bundle.js",
                        "~/Scripts/jquery.slimscroll.min.js",
                       "~/AdminLTE/dist/js/demo.js",
                      "~/Scripts/jquery.validate.min.js",
                      "~/Scripts/jquery.canvasjs.min.js",
                      "~/AdminLTE/plugins/datatables/datatables.js",
                      "~/AdminLTE/plugins/datatables-rowgroup/dataTables.rowsGroup.js",
                      "~/Scripts/Site.js"
                      ));
            bundles.Add(new StyleBundle("~/admin-lte/css").Include(
                     "~/AdminLTE/plugins/fontawesome-free/css/all.min.css",
                     "~/AdminLTE/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css",
                     "~/AdminLTE/plugins/jsgrid/jsgrid.min.css",
                     "~/AdminLTE/plugins/jsgrid/jsgrid-theme.min.css",
                     "~/AdminLTE/plugins/toastr/toastr.min.css",
                      "~/AdminLTE/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
                      "~/AdminLTE/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
                      "~/AdminLTE/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
                      "~/AdminLTE/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
                      "~/AdminLTE/plugins/daterangepicker/daterangepicker.css",
                      "~/AdminLTE/plugins/summernote/summernote-bs4.css",
                      "~/AdminLTE/plugins/select2/css/select2.css",
                      "~/AdminLTE/plugins/select2-bootstrap4-theme/select2-bootstrap4.css",
                      "~/AdminLTE/dist/css/adminlte.min.css",
                      "~/AdminLTE/plugins/datatables/datatables.css",
                      "~/Content/PagedList.css",
                     "~/Content/Site.css"
                     ));
        }
    }
}
