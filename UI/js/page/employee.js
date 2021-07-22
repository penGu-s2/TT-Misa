$(document).ready(function() {
        // load data table 
        loadMisaDatatable()
            // load data department control
        loadDataDepartmentDropdownControl()
            // load data position control
        loadDataPositionDropdownControl()



        $("#add-employee-btn").click(function() {
            // reset modal after show
            resetModal()
                // change method modal 
            $("#detail-employee").attr("method", "POST")
                // get new employee code
            $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode`,
                    method: "GET",
                    async: false
                }).done(function(response) {
                    var employeeCode = response
                    $("[name=EmployeeCode]").val(employeeCode)
                })
                // open modal
            $("#detail-employee").show()
        })

        // click reload btn 
        $("#reloadBtn").click(function() {
            console.log("click/press reload btn")
            loadMisaDatatable()
        })

        // dblclick to show employee detail to modal
        $("#misa-datatable tbody tr").dblclick(function() {
            // reset modal after show
            resetModal()
                // change method modal 
            $("#detail-employee").attr("method", "PUT")
                // open modal
            $("#detail-employee").show()
                // get employee id from tr
            const id = $(this).attr("employeeId")
                // call ajax get employee detail
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
                method: "GET",
                async: false
            }).done(function(response) {
                var employee = response
                $("[name=EmployeeCode]").val(formatText(employee["EmployeeCode"]))
                $("[name=FullName]").val(formatText(employee["FullName"]))
                $("[name=IdentityNumber]").val(formatText(employee["IdentityNumber"]))
                $("[name=IdentityPlace]").val(formatText(employee["IdentityPlace"]))
                $("[name=Email]").val(formatText(employee["Email"]))
                $("[name=PhoneNumber]").val(formatText(employee["PhoneNumber"]))
                $("[name=Salary]").val(formatMoney(convertToNumber(employee["Salary"])))
                $("[name=JoinDate]").val(formatDateToyyyyMMdd(formatText(employee["JoinDate"])))
                $("[name=DateOfBirth]").val(formatDateToyyyyMMdd(formatText(employee["DateOfBirth"])))
                $("[name=IdentityDate]").val(formatDateToyyyyMMdd(formatText(employee["IdentityDate"])))
                selectOptionDropdown("GenderName", formatText(employee["GenderName"]))
                selectOptionDropdown("PositionName", formatText(employee["PositionId"]))
                selectOptionDropdown("DepartmentName", formatText(employee["DepartmentId"]))


                validateEmployee(employee)
                    // set employee id to modal 
                $("#detail-employee").attr("employeeId", id)
            }).fail(function(response) {
                alert("Vui long liên hệ với nhân viên misa để được hỗ trợ!")
            })
        })



        //click to remove a employee


        $("#misa-datatable tbody tr").mousedown(function(event) {

            // get employee id from tr
            const id = $(this).attr("employeeId")

            if (confirm(`Bạn có chắc chắn muốn xóa nhân viên này không?`)) {
                // call ajax delete employee detail
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
                    method: "DELETE",
                    async: false
                }).done(function(response) {
                    alert("Xóa thành công")
                        // reload table

                    loadMisaDatatable()
                    location.reload();
                }).fail(function(response) {
                    alert("Vui lòng liên hệ misa để được hỗ trợ chức năng này")
                })

            }

        })
    })
    /**
     * Reset modal 
     * CreatedBy :  m_peNGU NguyenThang(21/7/2021) 
     */
function resetModal() {
    $("[name=EmployeeCode]").val("")
    $("[name=FullName]").val("")
    $("[name=IdentityNumber]").val("")
    $("[name=IdentityPlace]").val("")
    $("[name=Email]").val("")
    $("[name=PhoneNumber]").val("")
    $("[name=Salary]").val("")
    $("[name=JoinDate]").val("")
    $("[name=DateOfBirth]").val(null)
    $("[name=IdentityDate]").val(null)
    selectOptionDropdown("GenderName", "")
    selectOptionDropdown("PositionName", "")
    selectOptionDropdown("DepartmentName", "")
    $("input[required]").removeClass("red-border")
}

/**
 * Load data to misa-datatable
 * CreatedBy :  m_peNGU NguyenThang(21/7/2021)
 */
function loadMisaDatatable() {
    $.ajax({
        url: `http://cukcuk.manhnv.net/v1/Employees`,
        method: "GET",
        async: false
    }).done(function(response) {
        var source = ""
        var counter = 1
        response.forEach(element => {
            var row =
                `<tr employeeId=${element.EmployeeId}>
                <td class="txt-align-right">${counter}</td>
                <td>${formatText(element.EmployeeCode)}</td>
                <td>${formatText(element.FullName)}
                </td>
                <td>${formatText(element.GenderName)}</td>
                <td>${formatDateToddMMyyy(formatText(element.DateOfBirth))}</td>
                <td>${formatText(element.PhoneNumber)}</td>
                <td>${formatText(element.Email)}
                </td>
                <td>${formatText(element.PositionName)}</td>
                <td>${formatText(element.DepartmentName)}</td>
                <td class="txt-align-right">${formatMoney(element.Salary)}</td>
                <td>${formatText(element.WorkStatus)}</td>
            </tr>`
            counter++
            source += (row)
        });
        $("#misa-datatable>tbody").append(source)
    }).fail(function(response) {
        alert("Vui long liên hệ với nhân viên misa để được hỗ trợ!")
    })
}

/**
 * Load data department control : filter and modal
 * CreatedBy :  m_peNGU NguyenThang(21/7/2021)
 */
function loadDataDepartmentDropdownControl() {
    $.ajax({
        url: `http://cukcuk.manhnv.net/api/Department`,
        method: "GET"
    }).done(function(response) {
        let source =
            `<div class="drop-item selected" value="Tất cả phòng ban">
                <div class="checked-icon">
                </div>
                <div class="item-text">Tất cả phòng ban</div>
            </div>`
        let sourceModal = ``
        response.forEach(element => {
            let row =
                `<div class="drop-item" value="${element.DepartmentId}">
                <div class="checked-icon"></div>
                <div class="item-text">${element.DepartmentName}</div>
            </div>`
            source += row
            sourceModal += row
        });

        $(".department .drop-data-site").html(source)
        $(".department.department-modal .drop-data-site").html(sourceModal)

        const dataDepartmentSiteModal = $(".department.department-modal .drop-data-site").find(".drop-item").first()

        dataDepartmentSiteModal.find(".checked-icon").html(`<i class="fa fa-check"></i>`)
        dataDepartmentSiteModal.addClass("selected")
        dataDepartmentSiteModal.parent().parent().find(".drop-text").text(response[0].DepartmentName)
        $(".department.department-modal").attr("value", response[0].DepartmentId)
    }).fail(function(response) {
        alert("Vui long liên hệ với nhân viên misa để được hỗ trợ!")
    })
}

/**
 * Load data to position control : filter and modal
 * CreatedBy :  m_peNGU NguyenThang(21/7/2021)
 */
function loadDataPositionDropdownControl() {
    $.ajax({
        url: `http://cukcuk.manhnv.net/v1/Positions`,
        method: "GET"
    }).done(function(response) {
        let source =
            `<div class="drop-item selected" value="Tất cả vị trí">
                <div class="checked-icon">
                    <i class="fa fa-check"></i>
                </div>
                <div class="item-text">Tất cả vị trí</div>
            </div>`
        let sourceModal = ``
        response.forEach(element => {
            let row =
                `<div class="drop-item" value="${element.PositionId}">
                <div class="checked-icon"></div>
                <div class="item-text">${element.PositionName}</div>
            </div>`
            source += row
            sourceModal += row
        });

        $(".position .drop-data-site").html(source)
        $(".position.position-modal .drop-data-site").html(sourceModal)


        const dataPositionSiteModal = $(".position.position-modal .drop-data-site").find(".drop-item").first()

        dataPositionSiteModal.find(".checked-icon").html(`<i class="fa fa-check"></i>`)
        dataPositionSiteModal.addClass("selected")
        dataPositionSiteModal.parent().parent().find(".drop-text").text(response[0].PositionName)
        $(".position.position-modal").attr("value", response[0].PositionId)
    }).fail(function(response) {
        alert("Vui long liên hệ với nhân viên misa để được hỗ trợ!")
    })
}