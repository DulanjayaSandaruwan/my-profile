/*Stages Styling----*/
function showManageItemForm() {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    setItemDetailsValue("", "", "");
    $("#txtSearchItem").val("");
    $("#description-alert").text("");
    $("#qty-alert").text("");
    $("#unitPrice-alert").text("");
    getAllItems();
    $("#manageItemForm").css("display", "block");
    $("#placeOrderForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
    $("#manageOrderForm").css("display", "none");
}

function showPlaceOrderForm() {
    $("#tblItems > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    $("#tblCart > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    getAllItemsOnPlaceOrderForm();
    $("#txtQTY").val("");
    $("#tblCart > tbody").empty();
    $("#txtDiscount").val("");
    $("#txtTotal").val("");
    setCustomerDetailsOnPlaceOrder("", "", "");
    $("#cmbCustomers").get(0).selectedIndex = 0;
    $("#placeOrderForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#manageCustomerForm").css("display", "none");
    $("#manageOrderForm").css("display", "none");
}

function showManageCustomerForm() {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    setCustomerDetailsValue("", "", "");
    $("#txtSearchCustomer").val("");
    $("#manageCustomerForm").css("display", "block");
    $("#manageItemForm").css("display", "none");
    $("#placeOrderForm").css("display", "none");
    $("#manageOrderForm").css("display", "none");
}

function showManageOrderForm() {
    let cmbOrderId = $("#cmbOrderId");
    cmbOrderId.empty();
    cmbOrderId.append("<option>Select</option>");
    for (let i = 0; i < orderTable.length; i++) {
        $("#cmbOrderId").append("<option>"+orderTable[i].getOid()+"</option>");
    }
    cmbOrderId.get(0).selectedIndex = 0;
    $("#cmbCustomerId-ManageOrders").get(0).selectedIndex = 0;
    $("#tblOrders > tbody").empty();
    $("#txtDiscount2").val("");
    $("#txtTotal2").val("");
    $("#manageOrderForm").css("display", "block");
    $("#manageCustomerForm").css("display", "none");
    $("#manageItemForm").css("display", "none");
    $("#placeOrderForm").css("display", "none");
}

$(document).keydown(function (e) {
    let keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 === 0 || keycode1 === 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});
/*--------------------------------------------------*/