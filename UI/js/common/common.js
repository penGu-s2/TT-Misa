$(document).ready(function() {
    $(".dropdown").click(function() {
        $(this).find(".drop-data-site").slideToggle(300);

        var dropDown = $(this)

        $(document).click(function(e) {
            if (!dropDown.is(e.target) && dropDown.has(e.target).length === 0) {
                var isOpened = dropDown.find(".drop-data-site").css("display")
                if (isOpened == "block") {
                    dropDown.find(".drop-data-site").slideUp(300)
                }

            }
        });
        var options = dropDown.find(".drop-item")
        options.click(function() {

            var textSiteDropdown = $(this).parent().parent().find(".drop-text")
            var selectedOptionDropdown = $(this).find(".item-text").text()
            textSiteDropdown.text(selectedOptionDropdown)

            var dataSiteDropdown = $(this).parent().find(".drop-item")
            dataSiteDropdown.removeClass("selected")
            dataSiteDropdown.find(".checked-icon").html("")

            $(this).parent().parent().attr("value", $(this).attr("value"))
            $(this).addClass("selected");
            $(this).find(".checked-icon").html(`<i class="fa fa-check"></i>`)

        })
    })

    $(".close, .cancel").click(function() {
        $(".modal").hide()
    })

    $(".input-search").change(function() {
        let keyword = $(this).val()
        if (keyword.length == 0) {
            $(this).parent().find(".reset-icon").hide()
        } else {
            $(this).parent().find(".reset-icon").show()
        }
    })
})




/**
 * 
 * 
 * 
 */
var convertToNumber = function(par) {
    return Number(par)
}

/**
 * auto match control by value
 * @param {*} par 
 * @returns 
 */
function selectOptionDropdown(nameControl, val) {
    const currentControl = $(`[name=${nameControl}]`)
    let options = currentControl.find(".drop-item")
    let flag = false
    for (let i = 0; i < options.length; i++) {
        var element = $(options[i])
        if (element.attr("value") == val) {
            currentControl.attr("value", val)
            var textSiteDropdown = element.parent().parent().find(".drop-text")
            var selectedOptionDropdown = element.find(".item-text").text()
            textSiteDropdown.text(selectedOptionDropdown)

            var dataSiteDropdown = element.parent().find(".drop-item")
            dataSiteDropdown.removeClass("selected")
            dataSiteDropdown.find(".checked-icon").html("")

            element.addClass("selected");
            element.find(".checked-icon").html(`<i class="fa fa-check"></i>`)
            flag = true
            break;
        }
    }
    if (!flag) {
        currentControl.attr("value", val)
        var textSiteDropdown = $(options[0]).parent().parent().find(".drop-text")
        var selectedOptionDropdown = $(options[0]).find(".item-text").text()
        textSiteDropdown.text(selectedOptionDropdown)

        var dataSiteDropdown = $(options[0]).parent().find(".drop-item")
        dataSiteDropdown.removeClass("selected")
        dataSiteDropdown.find(".checked-icon").html("")

        $(options[0]).addClass("selected");
        $(options[0]).find(".checked-icon").html(`<i class="fa fa-check"></i>`)
    }
}

/**
 * reset text if undifined and null
 * @param {Any} par tham số truyền vào 
 * @returns chuỗi tham số 
 * CreatedBy: nguyenthang(20/7/2021)
 */
var formatText = function(par) {
    return (typeof(par) != "undefined" && par != null && par != "null") ? par.toString() : ""
}

/**
 * format date yyyy-MM-dd
 * @param {String} par ngày dạng string 
 * @returns định dạng ngày yyyy-MM-dd
 * CreatedBy: nguyenthang(20/7/2021)
 */
var formatDateToyyyyMMdd = function(par) {
    if (par != "") {
        let date = new Date(par)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth()
        let day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()
        return `${year}-${month}-${day}`
    }
    return ""

}

/**
 * format date to dd/MM/yyyy
 * @param {String} par ngày dạng string 
 * @returns định dạng ngày dd/MM/yyyy
 * CreatedBy: nguyenthang(20/7/2021)
 */
var formatDateToddMMyyy = function(par) {
    if (par != "") {
        let date = new Date(par)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth()
        let day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()
        return `${day}/${month}/${year}`
    }
    return ""

}

/**
 * format money VND
 * @param {String} par số dạng chuỗi 
 * @returns định dạng tiền việt nam
 * CreatedBy: nguyenthang(20/7/2021)
 */
var formatMoney = function(par) {
    let pattern = ""
    let result = ""
    let counter = 0
    if (par.length <= 3) return par + ""
    for (let i = par.length - 1; i >= 0; i--) {
        pattern = par[i] + pattern;
        if (pattern.length == 3) {
            if (counter != 0) result = pattern + "." + result
            else result = pattern
            pattern = ""
            counter++
        }
    }
    if (pattern.length != 0) result = pattern + "." + result
    return result
}

/**
 * Override format money
 * @param {Number} par 
 * @returns to string vnd
 * CreatedBy : nguyenthang(21/7/2021)
 */
var formatMoney = function(par) {
    if (par == null) return ""
    else {
        var result = par.toLocaleString('vi', { style: 'currency', currency: 'VND' })
        return result.substring(0, result.length - 1)
    }

}

/**
 * Check par is null or undifined
 * @param {Any} par
 * @returns Boolean 
 * CreatedBy : nguyenthang(21/7/2021)
 */
var isNullOrUndifined = function(par) {
    return (typeof(par) != "undefined" && par != null && par != "null" && par != "") ? false : true
}

/**
 * 
 */
var validateEmail = function(par) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(par);
}