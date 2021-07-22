$(document).ready(function() {
    // make money split by .
    $(".salary-input-box").change(function() {
        let salary = $(this).val()
        $(this).val(formatMoney(convertToNumber(salary)))

    })

    // validate input : Fullname, IdentityNumber, Email, IdentityDate, PhoneNumber, EmployeeCode
    $("input[required]").blur(function() {
            const val = $(this).val()
            if (isNullOrUndifined(val)) {
                $(this).addClass("red-border")
                $(this).attr("title", "Trường này là bắt buộc")
            } else {
                $(this).removeClass("red-border")
                $(this).attr("title", "")
            }
        })
        // check format email
    $("[name=Email]").blur(function() {
            const val = $(this).val();
            if (validateEmail(val)) {
                $(this).removeClass("red-border")
                $(this).attr("title", "")
            } else {
                $(this).addClass("red-border")
                $(this).attr("title", "Email không đúng định dạng")
            }
        })
        // save form when click save btn
    $("#btnSave").click(function(event) {
        saveFormEmployee();

    })
    $(document).keypress(function(event) {
        const isOpened = $("#detail-employee").css("display")
        if (event.which == 13 && isOpened == "block") {
            saveFormEmployee()
        }
    })
})

/**
 * validate data employee
 * @param {Employee} par 
 * CreatedBy : m_peNGU NguyenThang(21/7/2021)
 */
function validateEmployee(par) {
    if (par["EmployeeCode"] == "") {
        $("[name=EmployeeCode]").addClass("red-border")
        $("[name=EmployeeCode]").attr("title", "Bạn cần nhập mã nhân viên")
    }
    if (par["Email"] == "" || !validateEmail(par["Email"])) {
        $("[name=Email]").addClass("red-border")
        $("[name=Email]").attr("title", "Email không đúng định dạng")
        if (par["Email"] == "") {
            $("[name=Email]").attr("title", "Bạn cần nhập email")
        }
    }
    if (par["FullName"] == "") {
        $("[name=FullName]").addClass("red-border")
        $("[name=FullName]").attr("title", "Bạn cần nhập tên")
    }
    if (par["PhoneNumber"] == "") {
        $("[name=PhoneNumber]").addClass("red-border")
        $("[name=PhoneNumber]").attr("title", "Bạn cần nhạp số điện thoại")
    }
    if (par["IdentityNumber"] == "") {
        $("[name=IdentityNumber]").addClass("red-border")
        $("[name=IdentityNumber]").attr("title", "Bạn cần nhập căn cước")
    }
}

/**
 * save form detail employee 
 * CreatedBy : m_peNGU NguyenThang(21/7/2021)
 */
function saveFormEmployee() {
    const method = $("#detail-employee").attr("method")
    let url = ""
    switch (method) {
        case "PUT":
            const id = $("#detail-employee").attr("employeeId")
            url = `http://cukcuk.manhnv.net/v1/Employees/${id}`
            break;
        default:
            url = `http://cukcuk.manhnv.net/v1/Employees`
            break;
    }

    let employee = {
        "EmployeeCode": $("[name=EmployeeCode]").val(),
        "FullName": $("[name=FullName]").val(),
        "Gender": $("[name=GenderName]").attr("value"),
        "DateOfBirth": "3232-12-03T00:00:00",
        "PhoneNumber": $("[name=PhoneNumber]").val(),
        "Email": $("[name=Email]").val(),
        "IdentityNumber": $("[name=IdentityNumber]").val(),
        "IdentityDate": "3333-12-03T00:00:00",
        "IdentityPlace": $("[name=IdentityPlace]").val(),
        "JoinDate": null,
        "DepartmentId": $("[name=DepartmentName]").attr("value"),
        "PositionId": $("[name=PositionName]").attr("value"),
        "WorkStatus": 0,
        "Salary": Number($("[name=Salary]").val().replaceAll('.', ''))
    }
    $.ajax({
        url: url,
        method: method,
        async: false,
        data: JSON.stringify(employee),
        dataType: "json",
        contentType: "application/json"
    }).done(function(response) {
        if (method == "POST") {
            alert("Thêm thành công!")

        } else if (method == "PUT") {
            alert("Sửa thành công")

        }
        loadMisaDatatable()
    }).fail(function(response) {
        alert("Vui long liên hệ với nhân viên misa để được hỗ trợ!")
    })
}