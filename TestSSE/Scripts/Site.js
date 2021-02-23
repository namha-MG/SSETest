$(document).ready(function () {
    $('#btnSave').click(function () {
        $("#formview form").submit();
    });
    $('#btnBack').click(function () {
        window.history.back();
    });
    $("#btnGhiLai").click(function () {
        $("#formview form").submit();
    });
    $("#btnSearch").click(function () {
        $("#formview form").submit();
    });
    $.fn.datepicker.defaults.language = 'vi';

    $(document).on('shown.lte.pushmenu', function () {
        collapseMenu(false);
    })

    $(document).on('collapsed.lte.pushmenu', function () {
        collapseMenu(true);
    })

    // fix for multi dialog
    $(document).on("hidden.bs.modal", ".modal", function (e) {
        if (jQuery("body").find(".modal.show").length > 0) {
            jQuery("body").addClass("modal-open");
        }
    });
    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
});

function collapseMenu(isCollapse) {
    $.ajax({
        url: "/Extension/SetCollapseMenu",
        data: { isCollapse: isCollapse },
        dataType: "json",
        success: function (data) {
        },
        complete: function (data) {
        }
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// set language for select 2
$.fn.select2.amd.define('select2/i18n/vi', [], function () {
    // Vie
    return {
        errorLoading: function () {
            return 'Chưa tải được dữ liệu.';
        },
        inputTooLong: function (args) {
            var overChars = args.input.length - args.maximum;
            var message = 'Tìm kiếm quá nhiều ký tự';
            return message;
        },
        inputTooShort: function (args) {
            var remainingChars = args.minimum - args.input.length;

            var message = 'Tìm kiếm quá ít ký tự';

            return message;
        },
        loadingMore: function () {
            return 'Đang tải dữ liệu…';
        },
        maximumSelected: function (args) {
            var message = 'Giới hạn số lượng lựa chọn';
            return message;
        },
        noResults: function () {
            return 'Không tìm thấy kết quả';
        },
        searching: function () {
            return 'Đang tìm kiếm…';
        }
    };
});

$.fn.select2.defaults.set("language", "vi");

$.fn.select2.amd.require(['select2/selection/search'], function (Search) {
    var oldRemoveChoice = Search.prototype.searchRemoveChoice;

    Search.prototype.searchRemoveChoice = function () {
        oldRemoveChoice.apply(this, arguments);
        this.$search.val('');
    };
});

$.fn.select2.defaults.set("templateResult", templateResult_Select);

// default value of datatables: language
$.fn.DataTable.defaults.language = {
    url: "/Scripts/language/Vietnamese.json"
};

$.fn.DataTable.defaults.dom = "<'row'<'col-sm-12'Bftr>>" +
    "<'row'<'col-md-4 d-none d-md-block d-sm-none pt-2'l><'col-md-4 no-print text-center'p><'col-md-4 text-right d-none d-md-block d-sm-none'i>>";

$.fn.DataTable.defaults.buttons = [];

var vn_daterangepicker = {
    "direction": "ltr",
    "format": "DD/MM/YYYY",
    "separator": " - ",
    "applyLabel": "Ok",
    "cancelLabel": "Hủy",
    "fromLabel": "Từ",
    "toLabel": "Đến",
    "customRangeLabel": "Tùy chọn",
    "daysOfWeek": [
        "CN",
        "Hai",
        "Ba",
        "Tư",
        "Năm",
        "Sáu",
        "Bảy"
    ],
    "monthNames": [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
    ],
    "firstDay": 1
};

function templateResult_Select(data) {
    var className = (data && data.className != null && data.className != undefined) ? data.className : '';

    var html = `<span class="select-item-text ${className}">` + data.text + '</span>';
    var desc = data.description ? data.description : data.element ? data.element.dataset['description'] : null;

    if (desc) {
        html += '<span class="select-item-desc">' + desc + '</span>'
    }

    return $("<div>" + html + "</div>");
}


// show or hide loading
jQuery.fn.showLoading = function (time) {
    var overlay = $(this).find(".overlay");
    if (overlay.length <= 0) {
        $(this).append("<div class=\"overlay\">< i class=\"fas fa-2x fa-sync-alt fa-spin\"></i></div>");
        overlay = $(this).find(".overlay");
    }
    overlay.show();
    time = (time == null || time == undefined) ? 30000 : time;
    setTimeout(function () { overlay.hide() }, time);
}

jQuery.fn.hideLoading = function () {
    var overlay = $(this).find(".overlay");
    if (overlay.length > 0) {
        overlay.hide()
    }
}

function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}
$.validator.addMethod('spaceValidate', function (value, element) {
    return this.optional(element) || value.replaceAll(' ', '') !== '';
}, "Vui lòng nhập đúng định dạng");
$.validator.addMethod('customphone', function (value, element) {
    return this.optional(element) || /^\d{3}\d{3}\d{4}$/.test(value);
}, "Vui lòng nhập đúng định dạng số điện thoại");
$.validator.addMethod('specialCharacter', function (value, element) {
    var regex = /^[A-Za-z ]+$/
    return this.optional(element) || regex.test(xoa_dau(value));
}, "Không được nhập kí tự đặc biệt và chữ số");

$.validator.addMethod('specialCharacterHaveNumber', function (value, element) {
    var regex = /^[A-Za-z0-9 ]+$/
    return this.optional(element) || regex.test(xoa_dau(value));
}, "Không được nhập kí tự đặc biệt");
$.validator.addMethod('validateVDL', function (value, element) {
    var regex = /^[0-9.]+$/
    return this.optional(element) || regex.test(value);
}, "Không được nhập chữ cái và kí tự đặc biệt. Nếu nhập số thập phân, vui lòng nhập kí tự '.' thay cho kí tự ','");
$.validator.addMethod('validateVDL0', function (value, element) {
    return this.optional(element) || value.replaceAll('.', '') > 0;
}, "Nhập số lớn hơn 0");
$.validator.addMethod('validateWebUrl', function (value, element) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return this.optional(element) || regexp.test(value);
}, "nhập đúng định dạng website url");
function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

$.taviJs = function () { }

// common tavi java script
$.extend(true, taviJs = {
    showDialog: function (options) {
        var defaultOptions = {
            id: 'popup',
            url: '',
            content: '',
            width: 500
        };
        options = $.extend(defaultOptions, options);

        var popup = $('#' + options.id);
        if (!popup.length) {
            $('body').append('<div class="modal fade" id="' + options.id + '"><div class="modal-dialog modal-dialog-centered" style="max-width:' + options.width + 'px"></div></div>');
            popup = $('#' + options.id);
        }
        if (options.url != '') {
            popup.find(".modal-dialog").load(options.url);
        }
        if (options.content != '') {
            popup.find(".modal-dialog").html(options.content);
        }
        popup.modal({ backdrop: 'static', keyboard: false });
        return popup;
    },
    showConfirmDialog: function (content) {
        return taviJs.showDialogCustom({
            id: 'confirmPopup',
            title: 'Xác nhận',
            type: 'warning',
            content: content,
            textYes: 'Tiếp tục'
        });
    },
    showDialogCustom: function (options) {
        var defaultOptions = {
            id: 'popup',
            title: 'Thông tin',
            type: 'default', // default | primary | secondary | info | warning | success | danger
            overlay: false,
            url: '',
            content: '',
            width: 500,
            height: null,
            textYes: 'Ghi lại',
            textNo: 'Đóng'
        };
        options = $.extend(defaultOptions, options);

        // remove old dialog if exists
        var popup = $('#' + options.id);
        if (popup.length) {
            popup.remove();
        }

        // create new dialog
        $('body').append('<div class="modal fade" id="' + options.id + '"><div class="modal-dialog modal-dialog-centered" style="max-width:' + options.width + 'px"></div></div>');
        popup = $('#' + options.id);
        popup.find('.modal-dialog').append('<div class="modal-content"></div>');
        var content = popup.find('.modal-content');

        // overlay
        if (options.overlay) {
            content.append(`<div class="overlay d-flex justify-content-center align-items-center">
                <i class= "fas fa-2x fa-sync fa-spin" ></i></div>`);
        }

        // init header
        content.append(`<div class="modal-header bg-` + options.type + `">
                            <h4 class="modal-title">` + options.title + `</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Đóng">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`);

        //init body
        content.append(`<div class="modal-body" ` + (options.height != null ? (`style="max-height:` + options.height + `px;overflow-y:auto"`) : ``) + `></div>`);
        if (options.url != '') {
            content.find(".modal-body").load(options.url);
        }
        if (options.content != '') {
            content.find(".modal-body").html(options.content);
        }

        var htmlYesButton = options.textYes == null ? "" : (`<button type="button" class="btn btn-primary cmd-save btn-sm">` + options.textYes + `</button>`);
        var htmlNoButton = options.textNo == null ? "" : (`<button type="button" class="btn btn-default cmd-close btn-sm" data-dismiss="modal">` + options.textNo + `</button>`);

        //init footer
        content.append(`<div class="modal-footer">
                            ${htmlNoButton}
                            ${htmlYesButton}
                        </div>`);
        popup.modal({ backdrop: 'static', keyboard: false });
        return popup;
    },


    // script load danh muc
    url_DanhMuc_CoQuan: "/BoMayToChuc/DanhMuc/dsCoQuan",
    url_DanhMuc_ChucVu: "/BoMayToChuc/DanhMuc/dsChucVu",
    url_DanhMuc_PhongBan: "/BoMayToChuc/DanhMuc/dsPhongBan",
    url_DanhMuc_Tinh: "/DanhMucChung/DonVihanhChinhCap1",
    url_DanhMuc_Huyen: "/DanhMucChung/DonVihanhChinhCap2",
    url_DanhMuc_Xa: "/DanhMucChung/DonVihanhChinhCap3",
    url_DanhMuc_Xa_ToanQuoc: "/DanhMucChung/DonVihanhChinhCap3ToanQuoc",
    url_DanhMuc_QuocGiaQuocTich: "/DanhMucChung/QuocGia",
    url_DanhMuc_DonViTinh: "/DanhMucChung/DonViTinh",
    url_DanhMuc_GioiTinh: "/DanhMucChung/GioiTinh",
    url_DanhMuc_DanToc: "/DanhMucChung/DanToc",
    url_DanhMuc_GiayToTuyThan: "/LoaiGiayToTuyThan/Get_DSSelectLoaiGiayTotuyThan",
    url_DanhMuc_DuongThuyHe: "/LoaiDuongThuyHe/Get_DSSelectLoaiDuongThuyHe",
    url_DanhMuc_LoaiDuong: "/LoaiDuong/Get_DSSelectLoaiDuong",
    url_DanhMuc_DiaDanh: "/LoaiDiaDanh/Get_DSSelectLoaiDiaDanh",
    url_DanhMuc_VungThuyhe: "/LoaiVungThuyHe/Get_DSSelectLoaiVungThuyHe",
    url_DanhMuc_MucDichSuDungQH: "/MucDichSuDungQH/Get_DSSelectMucDichSuDungQH",
    url_DanhMuc_BanDoDiaChinh: "/LoaiBanDoDiaChinh/Get_DSSelectBanDoDiaChinhh",
    url_DanhMuc_LoaiDiemToaDo: "/DanhMucSelect/Select_LoaiDiemToaDo",
    url_DanhMuc_LoaiDiemDoCao: "/DanhMucSelect/Select_LoaiDiemDoCao",
    url_DanhMuc_LoaiMoc: "/DanhMucSelect/Select_LoaiMoc",
    url_DanhMuc_LoaiCapHang: "/DanhMucSelect/Select_LoaiCapHang",
    url_DanhMuc_LoaiMocBienGioiDiaGioi: "/DanhMucSelect/Select_LoaiMocBienGioiDiaGioi",
    url_DanhMuc_HopHoSo: "/DanhMucSelect/Select_HopHoSo",
    url_DanhMuc_NamHoSo: "/DanhMucSelect/Select_NamHoSo",
    url_DanhMuc_LoaiDangSo: "/DanhMucSelect/Select_LoaiDangSo",
    url_DanhMuc_LoaiSo: "/DanhMucSelect/Select_LoaiSo",
    url_DanhMuc_MaHoSo: "/DanhMucSelect/Select_MaHoSo",
    url_DanhMuc_TonGiao: "/DanhMucChung/TonGiao",
    url_DanhMuc_GiayChungNhan: "/DuLieuThuaDat/Get_LoaiGiayChungNhan",
    url_DanhMuc_LoaiBienDong: "/LoaiBienDong/Get_LoaiBienDong",
    url_DanhMuc_DoiTuongSuDung: "/DoiTuongSuDung/Get_Loaidoituongsudung",
    url_DanhMuc_LoaiDatHienTrang: "/LoaiDatHienTrang/Get_Loaidathientrang",
    url_DanhMuc_LoaiKhuVucTongHop: "/LoaiKhuVucTongHop/Get_Loaikhuvuctonghop",
    url_DanhMuc_MucDichSuDung: "/MucDichSuDung/Get_Loaimucdichsudung",
    url_DanhMuc_LoaiKhuVucChucNangCapHuyen: "/LoaiKhuVucChucNangCapHuyen/Get_Loaikhuchucnangcaphuyen",
    url_DanhMuc_LoaiHanhLangAnToan: "/LoaiHangLangAnToanBaoVe/Get_HanhLangAnToan",
    url_DanhMuc_LoaiKhuChucNangCapTinh: "/LoaiKhuChucNangCapTinh/Get_LoaiKhuChucNangCapTinh",
    url_DanhMuc_LoaiQuyHoach: "/LoaiQuyHoach/Get_LoaiQuyHoach",
    url_DanhMuc_LoaiTaiSanGanVoiDat: "/LoaiTaiSanGanVoiDat/Get_LoaiTaiSanGanLienVoiDat",
    url_DanhMuc_LoaiTrangThaiCapGCN: "/LoaiTrangThaiCapGCN/Get_LoaiTrangThaiDangKiCapGCN",
    url_DanhMuc_ToBanDo: "/ToBanDo/Get_ToBanDo",
    url_DanhMuc_LoaiCayRung: "/LoaiCayRung/Get_LoaiCayRung",
    url_DanhMuc_LoaiCayTrong: "/LoaiCayTrong/Get_LoaiCayTrong",
    url_DanhMuc_TyLeDoDac: "/TyLeDoDac/Get_DSSelectLoaiTyLe",
    url_DanhMuc_TaiLieuKemTheo: "/TaiLieuKemTheo/Get_DSSelectTaiLieuKemTheo",
    url_DanhMuc_TaiLieu: "/TaiLieuKemTheo/Get_DSSelectTaiLieu",
    url_DanhMuc_LoaiNhaO: "/LoaiNhaO/Get_DSSelectLoaiNhaO",
    url_DanhMuc_LoaiTaiLieu: "/DanhMucSelect/Get_DSSelectLoaiTaiLieu",
    url_DanhMuc_LoaiDoiTuong: "/DanhMucSelect/Select_MaDoiTuong",
    url_DanhMuc_NguonGocSuDung: "/DanhMucSelect/Select_NguonGocSuDung",

    load_DanhMuc_TyLeDoDac: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_TyLeDoDac,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tỉ lệ đo đạc" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách Tỷ lệ đo đạc")
            }
        })
    },
    load_DanhMuc_LoaiNhaO: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiNhaO,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại nhà ở" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách Tỷ lệ đo đạc")
            }
        })
    },
    load_DanhMuc_QuocGiaQuocTich: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_QuocGiaQuocTich,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại quốc gia quốc tịch" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại quốc gia quốc tịch")
            }
        })
    },
    load_DanhMuc_TaiLieu: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_TaiLieu,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tài liệu" })
                toastr.error("Chưa lấy được danh sách loại nhà ở")
            }
        })
    },
    load_DanhMuc_TyLeDoDac: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_TyLeDoDac,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tỉ lệ đo đạc" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách tỷ lệ đo đạc")
            }
        })
    },
    load_DanhMuc_LoaiCayRung: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiCayRung,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại cây rừng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh loại sách cây rừng")
            }

        })
    },
    load_DanhMuc_LoaiCayTrong: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiCayTrong,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại cây trồng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại cây trồng")
            }
        })
    },
    load_DanhMuc_ToBanDo: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_ToBanDo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tờ bản đồ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại tờ bản đồ")
            }
        })
    },
    load_DanhMuc_GiayToTuyThan: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_GiayToTuyThan,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại giấy tờ tuỳ thân" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại giấy tờ tuỳ thân")
            }
        })
    },
    load_DanhMuc_LoaiTrangThaiCapGCN: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiTrangThaiCapGCN,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại trạng thái cấp GCN" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại trạng thái cấp GCN")
            }
        })
    },
    load_DanhMuc_DuongThuyHe: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_DuongThuyHe,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại đường thuỷ hệ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại đường thuỷ hệ")
            }
        })
    },
    load_DanhMuc_LoaiTaiSanGanVoiDat: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiTaiSanGanVoiDat,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại tài sản gắn với đất" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại tài sản gắn với đất")
            }
        })
    },
    load_DanhMuc_LoaiDuong: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDuong,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại đường" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại đường")
            }
        })
    },
    load_DanhMuc_LoaiQuyHoach: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiQuyHoach,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại quy hoạch" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại loại quy hoạch")
            }
        })
    },
    load_DanhMuc_DiaDanh: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_DiaDanh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại địa danh" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại địa danh")
            }
        })
    },
    load_DanhMuc_LoaiKhuChucNangCapTinh: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiKhuChucNangCapTinh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại khu chức năng cấp tỉnh" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại loại khu chức năng cấp tỉnh")
            }
        })
    },
    load_DanhMuc_VungThuyHe: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_VungThuyhe,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại vùng thuỷ hệ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại vùng thuỷ hệ")
            }
        })
    },
    load_DanhMuc_LoaiHanhLangAnToan: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiHanhLangAnToan,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại hành lang an toàn bảo vệ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách hành lang an toàn bảo vệ")
            }
        })
    },
    load_DanhMuc_MucDichSuDungQH: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_MucDichSuDungQH,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn mục đích sử dụng theo quy hoạch" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại mục đích sử dụng theo quy hoạch")
            }
        })
    },
    load_DanhMuc_BanDoDiaChinh: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_BanDoDiaChinh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại loại bản đồ địa chính" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại bản đồ địa chính")
            }
        })
    },
    load_DanhMuc_LoaiDiemToaDo: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDiemToaDo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại điểm tọa độ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại điểm tọa độ")
            }
        })
    }, load_DanhMuc_LoaiDiemDoCao: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDiemDoCao,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại điểm độ cao" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại điểm độ cao")
            }
        })
    }, load_DanhMuc_LoaiMoc: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiMoc,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại mốc" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại mốc")
            }
        })
    }, load_DanhMuc_LoaiCapHang: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiCapHang,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại cấp hạng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại cấp hạng")
            }
        })
    }, load_DanhMuc_LoaiMocBienGioiDiaGioi: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiMocBienGioiDiaGioi,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại mốc biên giới địa giới" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại mốc biên giới địa giới")
            }
        })
    },
    load_DanhMuc_HopHoSo: function (selectedId, eleId, parentID) {
        $.ajax({
            url: this.url_DanhMuc_HopHoSo,
            data: {
                id: selectedId,
                parentID: parentID
            },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại hộp hồ sơ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại hộp hồ sơ")
            }
        })
    },
    load_DanhMuc_MaHoSo: function (selectedId, eleId, parentID) {
        $.ajax({
            url: this.url_DanhMuc_MaHoSo,
            data: {
                id: selectedId,
                parentID: parentID
            },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn mã hồ sơ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại mã hồ sơ")
            }
        })
    },
    load_DanhMuc_NamHoSo: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_NamHoSo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn năm hồ sơ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách năm hồ sơ")
            }
        })
    },
    load_DanhMuc_LoaiDangSo: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDangSo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn dạng sổ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách dạng sổ")
            }
        })
    },
    load_DanhMuc_LoaiSos: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiSo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại sổ" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách loại sổ")
            }
        })
    },
    load_DanhMuc_TaiLieuKemTheo: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_TaiLieuKemTheo,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tài liệu theo kèm" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách tài liệu theo kèm")
            }
        })
    },
    load_DanhMuc_GioiTinh: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_GioiTinh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn giới tính" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách giới tính")
            }
        })
    },
    load_DanhMuc_LoaiBienDong: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiBienDong,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại biến động" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_LoaiKhuVucChucNangCapHuyen: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiKhuVucChucNangCapHuyen,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại khu vực chức năng cấp huyện" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_LoaiKhuVucTongHop: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiKhuVucChucNangCapHuyen,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại khu vực tổng hợp" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_MucDichSuDung: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_MucDichSuDung,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại mục đích sử dụng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_LoaiDatHienTrang: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDatHienTrang,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại đất hiện trạng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_DoiTuongSuDung: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_DoiTuongSuDung,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại đối tượng sử dụng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },
    load_DanhMuc_GiayChungNhan: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_GiayChungNhan,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn giấy chứng nhận" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách")
            }
        })
    },

    load_DanhMuc_DanToc: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_DanToc,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn dân tộc" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách dân tộc")
            }
        })
    },
    load_DanhMuc_TonGiao: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_TonGiao,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn tôn giáo" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách tôn giáo")
            }
        })
    },
    load_DanhMuc_LoaiTaiLieu: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiTaiLieu,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn loại tài liệu" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách tài liệu")
            }
        })
    },
    load_DanhMuc_LoaiDoiTuong: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_LoaiDoiTuong,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn mã đối tượng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách mã đối tượng")
            }
        })
    },
    load_DanhMuc_NguonGocSuDung: function (selectedId, eleId) {
        $.ajax({
            url: this.url_DanhMuc_NguonGocSuDung,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                data.unshift({ id: "", text: "Chọn nguồn gốc sử dụng" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách nguồn gốc")
            }
        })
    },
    load_DanhMuc: function (url, data, eleId, $form) {
        $.ajax({
            url: url,
            data: data,
            dataType: "html",
            success: function (data) {
                if ($form == undefined)
                    $("#" + eleId).html(data);
                else
                    $form.find("#" + eleId).html(data);
            },
            complete: function (data) {
            }
        });
    },

    // danh muc co quan
    load_DanhMuc_CoQuan: function (data, eleId, $form) {
        this.load_DanhMuc(this.url_DanhMuc_CoQuan, data, eleId, $form);
    },
    // danh muc phong ban
    load_DanhMuc_PhongBan: function (data, eleId) {
        this.load_DanhMuc(this.url_DanhMuc_PhongBan, data, eleId);
    },
    // danh muc chuc vu
    load_DanhMuc_ChucVu: function (data, eleId) {
        this.load_DanhMuc(this.url_DanhMuc_ChucVu, data, eleId);
    },

    // danh muc don vi hanh chinh cap tinh
    load_DanhMuc_Tinh: function (eleId, selectedId, addData) {
        $.ajax({
            url: this.url_DanhMuc_Tinh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                if (addData != undefined) data.unshift(addData);
                data.unshift({ id: "", text: "Chọn tỉnh" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách tỉnh")
            }
        })
    },

    // danh muc don vi hanh chinh cap tinh
    load_DanhMuc_Huyen: function (eleId, selectedId, parentId, addData) {
        $.ajax({
            url: this.url_DanhMuc_Huyen,
            data: { id: selectedId, parentId: parentId },
            dataType: "JSON",
            success: function (data) {
                if (addData != undefined) data.unshift(addData);
                data.unshift({ id: "", text: " Chọn huyện" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách huyện")
            }
        })
    },

    // danh muc don vi hanh chinh cap tinh
    load_DanhMuc_Xa: function (eleId, selectedId, parentId, addData) {
        $.ajax({
            url: this.url_DanhMuc_Xa,
            data: { id: selectedId, parentId: parentId },
            dataType: "JSON",
            success: function (data) {
                if (addData != undefined) data.unshift(addData);
                data.unshift({ id: "", text: "Chọn xã" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách xã")
            }
        })
    },
    load_DanhMuc_Xa_ToanQuoc: function (eleId, selectedId, addData) {
        $.ajax({
            url: this.url_DanhMuc_Xa_ToanQuoc,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                if (addData != undefined) data.unshift(addData);
                data.unshift({ id: "", text: "Chọn xã" })
                $("#" + eleId).empty().select2({
                    data: data
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách xã")
            }
        })
    },

    // danh muc don vi tinh
    load_DanhMuc_DonViTinh: function (eleId, selectedId) {
        $.ajax({
            url: this.url_DanhMuc_DonViTinh,
            data: { id: selectedId },
            dataType: "JSON",
            success: function (data) {
                $("#" + eleId).select2({
                    data: data,
                    templateResult: function (data) {
                        if (!data.id) {
                            return data.text;
                        }
                        var $temp = $("<span>" + data.text + (data.name != "" ? (" <i>(" + data.name + ")</i>") : "") + "</span>");
                        return $temp;
                    }
                });
            },
            error: function () {
                toastr.error("Chưa lấy được danh sách đơn vị tính")
            }
        })
    },
    //-------------------------------------------------------

    // helper
    displayFileSize: function (fileSize) {
        var sizes = ["B", "KB", "MB", "GB", "TB"];
        var order = 0;
        while (fileSize >= 1024 && order < sizes.length - 1) {
            order++;
            fileSize = fileSize / 1024;
        }
        var result = fileSize.toFixed(2) + " " + sizes[order];
        return result;
    },

    // create chart
    createChart: function (chartData, ele, height) {
        var func = this;
        height = height == undefined || height == "" ? 250 : height;
        $(ele).empty();
        $.each(chartData, function (index, value) {
            if (value.ChartType == "table") {
                var tblContent = $(ele).append(`<div class="chart-table-data" style="min-height: ` + height + `px;"></div>`).children("div").last();
                $(tblContent).html(func.create_DataTable_Chart(chartData, height));
            } else {
                var canvasEle = $(ele).append(`<canvas class="chart-preview" style="min-height: ` + height + `px; height:` + height + `px; max-height:` + height + `px; max-width:100%;"></canvas>`).children("canvas").last();
                if (value.ChartType == "area") {
                    func.create_Area_Chart(value, canvasEle);
                }
                if (value.ChartType == "line") {
                    func.create_Line_Chart(value, canvasEle);
                }
                if (value.ChartType == "pie") {
                    func.create_Pie_Chart(value, canvasEle);
                }
                if (value.ChartType == "bar") {
                    func.create_Bar_Chart(value, canvasEle);
                }
            }
        });
    },

    // function create area chart
    create_Area_Chart: function (data, ele) {
        var areaChartCanvas = $(ele).get(0).getContext('2d');
        var labels = data.Labels;
        var datasets = [];

        var areaChartData = {
            labels: labels,
            datasets: datasets
        };

        var areaChartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var unit = data.datasets[tooltipItem.datasetIndex].unit || '';

                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.yLabel.toLocaleString() + " " + unit;
                        return label;
                    },
                    footer: function (tooltipItem, data) {
                        return data.datasets[tooltipItem[0].datasetIndex].footer || '';
                    }
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            },
            title: {
                display: true,
                text: data.ChartTitle
            }
        }

        if (data.Datasets2 && data.Datasets2.length > 0 && data.Datasets2[0].Data.length > 0) {
            // add yAxes option:
            $.each(data.Datasets2, function (index, value) {
                var color = dynamicColors();
                datasets.push({
                    label: value.Label,
                    borderColor: color,
                    backgroundColor: color,
                    borderborderWidth: 3,
                    data: value.Data,
                    fill: false,
                    type: value.Type,
                    yAxisID: "RIGHT",
                    unit: value.Unit
                })
            });

            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    data: value.Data,
                    yAxisID: "LEFT",
                    unit: value.Unit,
                    footer: value.Footer,
                })
            });

            areaChartOptions.scales.yAxes = [
                {
                    display: true,
                    id: 'LEFT',
                    type: 'linear',
                    position: 'left',
                },
                {
                    display: true,
                    id: 'RIGHT',
                    type: 'linear',
                    position: 'right',
                    gridLines: {
                        display: false
                    }
                }
            ]
        } else {
            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    data: value.Data,
                    unit: value.Unit,
                    footer: value.Footer,
                })
            });
        }

        var areaChart = new Chart(areaChartCanvas, {
            type: 'line',
            data: areaChartData,
            options: areaChartOptions
        })
        return areaChart;
    },

    // function create line chart
    create_Line_Chart: function (data, ele) {
        var lineChartCanvas = $(ele).get(0).getContext('2d');
        var labels = data.Labels;
        var datasets = [];

        var areaChartData = {
            labels: labels,
            datasets: datasets
        };

        var areaChartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var unit = data.datasets[tooltipItem.datasetIndex].unit || '';

                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.yLabel.toLocaleString() + " " + unit;
                        return label;
                    },
                    footer: function (tooltipItem, data) {
                        return data.datasets[tooltipItem[0].datasetIndex].footer || '';
                    }
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                    }
                }]
            },
            datasetFill: false,
            title: {
                display: true,
                text: data.ChartTitle
            }
        }

        if (data.Datasets2 && data.Datasets2.length > 0 && data.Datasets2[0].Data.length > 0) {
            // add yAxes option:
            $.each(data.Datasets2, function (index, value) {
                var color = dynamicColors();
                datasets.push({
                    label: value.Label,
                    borderColor: color,
                    backgroundColor: color,
                    borderborderWidth: 3,
                    data: value.Data,
                    fill: false,
                    type: value.Type,
                    yAxisID: "RIGHT",
                    unit: value.Unit
                })
            });

            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    borderColor: dynamicColors(),
                    data: value.Data,
                    fill: false,
                    yAxisID: "LEFT",
                    footer: value.Footer,
                    unit: value.Unit
                })
            });

            areaChartOptions.scales.yAxes = [
                {
                    display: true,
                    id: 'LEFT',
                    type: 'linear',
                    position: 'left',
                },
                {
                    display: true,
                    id: 'RIGHT',
                    type: 'linear',
                    position: 'right',
                    gridLines: {
                        display: false
                    }
                }
            ]
        } else {
            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    borderColor: dynamicColors(),
                    data: value.Data,
                    fill: false,
                    unit: value.Unit,
                    footer: value.Footer,
                })
            });
        }


        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: areaChartData,
            options: areaChartOptions
        })
        return lineChart;
    },

    create_Pie_Chart: function (data, ele) {
        var pieChartCanvas = $(ele).get(0).getContext('2d')
        var labels = data.Labels;
        var datasets = [];
        var backgroundColor = [];
        var flg_setBackGroundColor = true;
        $.each(data.Datasets, function (index, value) {
            if (flg_setBackGroundColor) {
                $.each(value.Data, function (index, value) {
                    backgroundColor.push(dynamicColors());
                })
                flg_setBackGroundColor = false;
            }

            datasets.push({
                label: value.Label,
                backgroundColor: backgroundColor,
                data: value.Data,
                fill: false,
                unit: value.Unit
            })
        });

        var pieData = {
            labels: labels,
            datasets: datasets
        };
        var pieOptions = {
            tooltips: {
                callbacks: {
                    title: function (arr_tooltipItem, data) {
                        var tooltipItem = arr_tooltipItem[0];
                        var lb_text = data.datasets[tooltipItem.datasetIndex].label || '';
                        return lb_text;
                    },
                    label: function (tooltipItem, data) {
                        var lb_text = data.labels[tooltipItem.index];
                        var lb_value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();
                        var unit = data.datasets[tooltipItem.datasetIndex].unit || '';
                        return lb_text + ": " + lb_value + " " + unit;
                    },
                    afterLabel: function (tooltipItem, data) {
                        var sum = 0;
                        var dataArr = data.datasets[tooltipItem.datasetIndex].data;
                        var value = dataArr[tooltipItem.index];
                        dataArr.map(data => {
                            sum += data;
                        });
                        var percentage = (value * 100 / sum).toFixed(2) + "%";
                        return "(" + percentage + ")";
                    },
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: true,
                text: data.ChartTitle
            }
        }

        var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: pieData,
            options: pieOptions
        })
        return pieChart;
    },

    create_Bar_Chart: function (data, ele) {
        var barChartCanvas = $(ele).get(0).getContext('2d')
        var labels = data.Labels;
        var datasets = [];

        var barChartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var unit = data.datasets[tooltipItem.datasetIndex].unit || '';

                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.yLabel.toLocaleString() + " " + unit;
                        return label;
                    },
                    footer: function (tooltipItem, data) {
                        return data.datasets[tooltipItem[0].datasetIndex].footer || '';
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false,
            title: {
                display: true,
                text: data.ChartTitle
            },
            scales: {
                xAxes: [{
                    //barThickness: 50,  // number (pixels) or 'flex'
                    maxBarThickness: 100 // number (pixels),

                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        // if has multi yAxes
        if (data.Datasets2 && data.Datasets2.length > 0 && data.Datasets2[0].Data.length > 0) {
            // add yAxes option:
            $.each(data.Datasets2, function (index, value) {
                var color = dynamicColors();
                datasets.push({
                    label: value.Label,
                    borderColor: color,
                    backgroundColor: color,
                    borderborderWidth: 3,
                    data: value.Data,
                    fill: false,
                    type: value.Type,
                    yAxisID: "RIGHT",
                    unit: value.Unit
                })
            });

            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    data: value.Data,
                    fill: false,
                    yAxisID: "LEFT",
                    footer: value.Footer,
                    unit: value.Unit
                })
            });

            barChartOptions.scales.yAxes = [
                {
                    display: true,
                    id: 'LEFT',
                    type: 'linear',
                    position: 'left',
                },
                {
                    display: true,
                    id: 'RIGHT',
                    type: 'linear',
                    position: 'right',
                    gridLines: {
                        display: false
                    }
                }
            ]
        } else {
            $.each(data.Datasets, function (index, value) {
                datasets.push({
                    label: value.Label,
                    backgroundColor: dynamicColors(),
                    data: value.Data,
                    fill: false,
                    footer: value.Footer,
                    unit: value.Unit
                })
            });
        }

        var barChartData = {
            labels: labels,
            datasets: datasets
        };

        var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })
        return barChart;
    },

    create_DataTable_Chart: function (lstChartData, height) {
        var html = '';
        height = height == undefined || height == "" ? 300 : height;
        if (lstChartData.length > 0) {
            var isFirstTable = true;
            var col_count = 1;
            $.each(lstChartData, function (index, chartData) {
                // create header
                if (isFirstTable) {
                    html += `<div class="table-responsive" style="max-height:` + (height * lstChartData.length) + `px">
                        <table class="table table-bordered table-head-fixed table-dulieu-bieudo" width="100%">
                            <thead>
                                <tr>
                                    <th>Tiêu chí</th>`;

                    col_count += chartData.Datasets.length;

                    $.each(chartData.Datasets, function (dtsetIndex, data) {
                        html += `<th class='text-right'>${data.Label}${data.Unit ? ("<br/><span style='font-weight:normal;font-style:italic'>(" + data.Unit + ")</span>") : ""}</th>`;
                    });

                    if (chartData.Datasets2 && chartData.Datasets2.length > 0 && chartData.Datasets2[0].Data && chartData.Datasets2[0].Data.length > 0) {
                        col_count += chartData.Datasets2.length;

                        $.each(chartData.Datasets2, function (dtsetIndex, data) {
                            html += `<th class='text-right'>${data.Label}${data.Unit ? ("<br/><span style='font-weight:normal;font-style:italic'>(" + data.Unit + ")</span>") : ""}</th>`;
                        });
                    }

                    html += `</tr></thead><tbody>`;
                }

                if (lstChartData.length > 1 && chartData.ChartTitle) {
                    html += `<tr style="background-color:#d3f8f0;"><td colspan="${col_count}"><b>${chartData.ChartTitle}</b></td></tr>`;
                }

                $.each(chartData.Labels, function (labelIndex, label) {
                    html += "<tr><td>" + label + "</td>"
                    $.each(chartData.Datasets, function (dtsetIndex, data) {
                        html += "<td class='text-right'>" + data.Data[labelIndex].toLocaleString() + "</td>";
                    });

                    if (chartData.Datasets2 && chartData.Datasets2.length > 0 && chartData.Datasets2[0].Data && chartData.Datasets2[0].Data.length > 0) {
                        $.each(chartData.Datasets2, function (dtsetIndex, data) {
                            html += "<td class='text-right'>" + data.Data[labelIndex].toLocaleString() + "</td>";
                        });
                    }

                    html += "</tr>";
                });
                isFirstTable = false;
            })
            html += `</tbody></table></div>`;
        }
        return html;
    },

    dynamicColors: function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    },

    showImageOfPdf: function (filePath) {
        var ext = filePath.split('.').pop();
        var html = "";
        switch (ext) {
            case "pdf":
                html = `<iframe src="` + filePath.replace("~", "") + `" style="width:100%; height:700px;" frameborder="0"></iframe>`
                break;
            case "docx":
                html = `<a href="${filePath}">Tải file đính kèm</a>`
                break;
            case "png":
            case "jpg":
            case "jpeg":
                html = `<img src="` + filePath.replace("~", "") + `" style="width: 100%; height: auto;" />`
                break;
            default:
                html = `<iframe src="` + filePath.replace("~", "") + `" style="width:100%; height:700px;" frameborder="0"></iframe>`
                break;
        }
        var dialog = taviJs.showDialogCustom({
            id: "filePreviewer",
            width: 800,
            textYes: null,
            textNo: "Đóng",
            content: html,
            title: "File đính kèm"
        });

        dialog.find(".cmd-close").click(function () {
            dialog.modal("hide");
        })
    },
    // check file word pdf img vs show file html

    ShowFile: function (options) {
        var file = options.file.split('.').pop();
        (options.file != null || options.file != undefined) ? filename = options.file.substring(37) : filename;
        var linkfile = options.linkfile;
        var showhtml = "";
        var idshow = options.idshow;
        switch (file.toLowerCase()) {
            case 'pdf':
                showhtml = `<div id="showFile" class="row m-3">
            <div class="col-md-12 mt-3 mb-3">
                <i class="far fa-file-pdf text-primary" style="font-size:50px"></i>
            </div>
            <div class="col-md-12 p-2" style="background-color: #f8f9fa">
                <a href="#" onclick="taviJs.showImageOfPdf('${linkfile}')"><i class="fas fa-paperclip"></i> ${filename}</a>
            </div>
        </div>`;
                break;
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
            case 'jpeg':
            case 'pdf':
            case 'psd':
            case 'tiff':
                showhtml = `<div id="showFile" class="row m-3">
            <div class="col-md-12 mt-3 mb-3">
                <img src="${linkfile})" style="width:50px; heigth:auto"/>
            </div>
            <div class="col-md-12 p-2" style="background-color: #f8f9fa">
                <a href="#" onclick="taviJs.showImageOfPdf('${linkfile}')"><i class="fas fa-paperclip"></i> ${filename}</a>
            </div>
        </div>`;
                break;
            default:
                showhtml = `<div id="showFile" class="row">
            <div class="col-md-12 mt-3 mb-3">
                <i class="fas fa-paperclip text-primary" style="font-size:50px"></i>
            </div>
            <div class="col-md-12 p-2" style="background-color: #f8f9fa">
                <a href="${linkfile}"><i class="fa fa-download"></i> ${filename}</a>
            </div>
        </div>`;
                break;
        }
        idshow.append(showhtml);
    }
})
