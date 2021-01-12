function DeleteCountry(CountryId) {
    if (confirm("حذف هذه الدوله؟")) {
        $("#cover-spin").show();
        $.ajax({
            url: '/cp/DeleteCountry',
            method: 'POST',
            data: { Id: CountryId },
            success: function (results) {
                if (results.Success == false) {
                    $("#cover-spin").hide();
                    toastr.error(results.Message);
                }
                else {
                    $("#CountryTR_" + CountryId).remove();
                    $("#cover-spin").hide();
                    toastr.success("تم الحذف بنجاح");
                }
            }
        })
    }
}

function DeleteArea(AreaId) {
    if (confirm("حذف هذه المنطقه؟")) {
        $("#cover-spin").show();
        $.ajax({
            url: '/cp/DeleteArea',
            method: 'POST',
            data: { Id: AreaId },
            success: function (results) {
                if (results.Success == false) {
                    $("#cover-spin").hide();
                    toastr.error(results.Message);
                }
                else {
                    $("#AreaTR_" + AreaId).remove();
                    $("#cover-spin").hide();
                    toastr.success("تم الحذف بنجاح");
                }
            }
        })
    }
}

function CreateLocalDeliveryFee() {
    var Cost = window.prompt("رجاءً قم بكتابة مصاريف الشحن");//parseInt(, 10);
    if (Cost != null && Cost != "") {
        if (/^[0-9.,]+$/.test(Cost)) {
        var CompanyProfit = window.prompt("رجاءً قم بكتابة ربح الشركة");
            if (CompanyProfit != null && CompanyProfit != "") {
                if (/^[0-9.,]+$/.test(Cost)) {
                    $("#cover-spin").show();
                    $.ajax({
                        url: '/DeliveryFees/CreateLocal',
                        type: 'POST',
                        data: { Cost: Cost, CompanyProfit: CompanyProfit},
                        success: function (results) {
                            if (results.Success == true) {
                                window.location.reload();
                            }
                            else {
                                $("#cover-spin").hide();
                                Swal.fire({
                                    title: 'حدث خطأ',
                                    text: results.Message,
                                    icon: 'error',
                                    confirmButtonText: 'حسناً',
                                });
                            }
                        }
                    })
                }
            }
        } else {
            CreateLocalDeliveryFee();
        }
    }
}

function EditLocalDeliveryFee(old, compProfit) {
    var Cost = window.prompt("رجاءً قم بكتابة مصاريف الشحن", old);//parseInt(, 10);
    if (Cost != null && Cost != "") {
        if (/^[0-9.,]+$/.test(Cost)) {
            var CompanyProfit = window.prompt("رجاءً قم بكتابة ربح الشركة", compProfit);
            if (CompanyProfit != null && CompanyProfit != "") {
                if (/^[0-9.,]+$/.test(Cost)) {
                    $("#cover-spin").show();
                    $.ajax({
                        url: '/DeliveryFees/EditLocal',
                        type: 'PUT',
                        data: { Cost: Cost, CompanyProfit: CompanyProfit },
                        success: function (results) {
                            if (results.Success == true) {
                                window.location.reload();
                            }
                            else {
                                $("#cover-spin").hide();
                                Swal.fire({
                                    title: 'حدث خطأ',
                                    text: results.Message,
                                    icon: 'error',
                                    confirmButtonText: 'حسناً',
                                });
                            }
                        }
                    })
                }
            }
        } else {
            EditLocalDeliveryFee(old);
        }
    }
}

function Quick(q) {
    var DriverId = $("#drivers-select").val();
    $("#cover-spin").show();
    $.ajax({
        url: '/Reports/QuickActions',
        data: { q: q ,DriverId: DriverId},
        success: function (results) {
            $("#invoice-data").empty();
            $("#invoice-data").html(results);
            $("#cover-spin").hide();
        }
    })
}

$(function () {
    $("#drivers-select2, #drivers-select").select2();


    $("#CountriesTable,#DriversTable").DataTable({
        ordering: false,
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Arabic.json"
        }
    })

    $('.color-picker').spectrum({
        preferredFormat: "hex",
        type: "color",
        togglePaletteOnly: true,
        showAlpha: false
    });

    $('#invoice-range').daterangepicker({
        "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "اختيار",
            "cancelLabel": "إلغاء",
            "fromLabel": "من",
            "toLabel": "إلى",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "يناير",
                "فبراير",
                "مارس",
                "ابريل",
                "مايو",
                "يونيو",
                "يوليو",
                "اغسطس",
                "سبتمبر",
                "اكتوبر",
                "نوفمبر",
                "ديسمبر"
            ],
            "firstDay": 1
        }
    })

    $("#invoice-range").change(function () {
        var DriverId = $("#drivers-select").val();
        $("#cover-spin").show();
        $.ajax({
            url: '/Reports/SelectInvocieDateRange',
            data: { Range: $(this).val(), DriverId: DriverId},
            success: function (results) {
                $("#invoice-data").empty();
                $("#invoice-data").html(results);
                $("#cover-spin").hide();
            }
        })
    })

    $("#drivers-select").change(function () {
        $("#invoice-range").trigger("change");
    })

    $("#drivers-select2").change(function () {
        $("#cover-spin").show();
        var Id = $(this).val();
        $.ajax({
            url: "/Reports/selectDriver",
            type: "POST",
            data: { DriverId: Id },
            success: function (results) {
                $("#WorkerReport").empty();
                $("#WorkerReport").html(results);
                $("#cover-spin").hide();
            }
        })
    })
})

function DeletePartnerType(Id) {
    if (confirm("حذف هذا النوع؟")) {
        $("#cover-spin").show();
        $.ajax({
            url: '/PartnerTypes/Delete',
            method: 'DELETE',
            data: { Id: Id },
            success: function (results) {
                if (results.Success == false) {
                    $("#cover-spin").hide();
                    toastr.error(results.Message);
                }
                else {
                    $("#TypeTR_" + Id).remove();
                    $("#cover-spin").hide();
                    toastr.success("تم الحذف بنجاح");
                }
            }
        })
    }
}

function RestorePartnerType(Id) {
    if (confirm("استعاده هذا النوع؟")) {
        $("#cover-spin").show();
        $.ajax({
            url: '/PartnerTypes/Restore',
            method: 'GET',
            data: { Id: Id },
            success: function (results) {
                if (results.Success == false) {
                    $("#cover-spin").hide();
                    toastr.error(results.Message);
                }
                else {
                    $("#cover-spin").hide();
                    toastr.success("تمت الاستعاده بنجاح");
                    window.location.reload();
                }
            }
        })
    }
}

function EditPartnerType(Id, Name) {
    var NewName = window.prompt("من فضلك ادخل الاسم الجديد", Name);
    if (NewName != null && NewName != "" && NewName != Name) {
        $("#cover-spin").show();
        $.ajax({
            url: '/PartnerTypes/Edit',
            method: 'POST',
            data: { Id: Id, Name: NewName },
            success: function (results) {
                if (results.Success == false) {
                    toastr.error(results.Message);
                }
                else {
                    toastr.success("تم التعديل بنجاح");
                    $("#cover-spin").hide();
                    window.location.reload();
                }
                $("#cover-spin").hide();
            }
        })
    }
}

function CreatePartnerType() {
    var Name = window.prompt("من فضلك ادخل نوع المؤسسه");
        $("#cover-spin").show();
        $.ajax({
            url: '/PartnerTypes/Create',
            method: 'POST',
            data: { Name: Name },
            success: function (results) {
                if (results.Success == false) {
                    toastr.error(results.Message);
                }
                else {
                    toastr.success("تمت الاضافه بنجاح");
                    $("#cover-spin").hide();
                    window.location.reload();
                }
                $("#cover-spin").hide();
            }
        })
}
