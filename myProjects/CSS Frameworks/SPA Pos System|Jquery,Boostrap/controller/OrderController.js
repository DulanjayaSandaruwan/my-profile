/*Add values to Combo Box - CustomerID*/
function addValuesToCmbCustomer_ManageOrdersForm(value) {
    $("#cmbCustomerId-ManageOrders").append(value);
}

/*Add values to Combo Box - OrderID*/
function addValuesToCmbOrderID_ManageOrdersForm(value) {
    $("#cmbOrderId").append(value);
}

/*Select order id from combo box*/
$("#cmbOrderId").change(function () {
    let oid = $(this).children("option:selected").text();
    let date = "";
    let discount = 0;
    let total = 0;

    for (let i = 0; i < orderTable.length; i++) {
        if (orderTable[i].getOid() === oid) {
            date = orderTable[i].getDate();
            discount = orderTable[i].getDiscount();
            total = orderTable[i].getTot();
        }
    }

    $("#txtDiscount2").val(discount);
    $("#txtTotal2").val(total);

    let tblOrders = $("#tblOrders > tbody");
    tblOrders.empty();
    for (let i = 0; i < orderDetailTable.length; i++) {
        if (orderDetailTable[i].getOrderid() === oid) {
            let code = orderDetailTable[i].getItemCode();
            let description = "";
            let qty = orderDetailTable[i].getItemQty();
            let totAmount = orderDetailTable[i].getTotAmount();

            for (let j = 0; j < itemTable.length; j++) {
                if (itemTable[j].getCode() === code) {
                    description = itemTable[j].getDescription();
                }
            }

            tblOrders.append("<tr>" +
                "<td>"+code+"</td>" +
                "<td>"+description+"</td>" +
                "<td>"+qty+"</td>" +
                "<td>"+totAmount+"</td>" +
                "<td>"+date+"</td>" +
                "</tr>");
        }
    }
});

/*Select customer id from combo box*/
$("#cmbCustomerId-ManageOrders").change(function () {
    let cid = $(this).children("option:selected").text();
    $("#tblOrders > tbody").empty();
    let cmbOrderId = $("#cmbOrderId");
    cmbOrderId.empty();
    cmbOrderId.append("<option>Select</option>");
    $("#txtDiscount2").val("");
    $("#txtTotal2").val("");

    if (cid === "Select") {
        for (let i = 0; i < orderTable.length; i++) {
            $("#cmbOrderId").append("<option>"+orderTable[i].getOid()+"</option>");
        }
    } else {
        for (let i = 0; i < orderTable.length; i++) {
            if (orderTable[i].getCustID() === cid) {
                addValuesToCmbOrderID_ManageOrdersForm("<option>" + orderTable[i].getOid() + "</option>");
            }
        }
    }
});