/*Generate Item Code*/
function generateItemCode() {
    try {
        let lastItemCode = itemTable[itemTable.length-1].getCode();
        let newItemCode = parseInt(lastItemCode.substring(1,4))+1;
        if (newItemCode < 10) {
            $("#item-code").text("I-00"+newItemCode);
        }else if (newItemCode < 100) {
            $("#item-code").text("I-0"+newItemCode);
        } else {
            $("#item-code").text("I-"+newItemCode);
        }
    } catch (e) {
        $("#item-code").text("I-001");
    }

}
generateItemCode();

/*Add items to Item table*/
$("#btnAddItem").click(function () {
    addItem();
});

function addItem() {
    let code = $("#item-code").text().substring(1);
    let description = $("#txtDescription");
    let unitPrice = $("#txtUnitPrice").val();
    let qty = $("#txtItemQTY").val();

    if (description.length !==0 && qty.length !==0 && unitPrice.length !==0) {
        itemTable.push(new Item(code, description.val(), qty, unitPrice));
        getAllItems();
        setItemDetailsValue("", "", "");
        generateItemCode();
        description.focus();
    } else {
        alert("Fields cannot be empty!");
    }
}

function setItemDetailsValue(description, qty, unitPrice) {
    $("#txtDescription").val(description);
    $("#txtItemQTY").val(qty);
    $("#txtUnitPrice").val(unitPrice);
}

function getAllItems() {
    $("#tblItems-manage-items > tbody").empty();
    for (let i = 0; i < itemTable.length; i++) {
        $("#tblItems-manage-items > tbody").append("<tr>" +
            "<td>"+itemTable[i].getCode()+"</td>" +
            "<td>"+itemTable[i].getDescription()+"</td>" +
            "<td>"+itemTable[i].getQty()+"</td>" +
            "<td>"+itemTable[i].getUnitPrice()+"</td>" +
            "</tr>");
    }
}

/*Select item from Item table*/
$("#tblItems-manage-items > tbody").on("click", "tr", function () {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let selectedRow = $(this).closest("tr");
    $(this).css({
        "background-color" : "#a7a7a7",
        "color" : "white"
    });

    let code = selectedRow.find("td:eq(0)").text();
    let description = selectedRow.find("td:eq(1)").text();
    let unitPrice = selectedRow.find("td:eq(2)").text();
    let qty = selectedRow.find("td:eq(3)").text();

    setItemDetailsValue(description, unitPrice, qty);
    $("#txtSearchItem").val(code);
});

/*Update an Item*/
$("#btnUpdateItem").click(function () {
    if ($("#txtDescription").val().length !== 0) {
        let code = $("#txtSearchItem").val();
        let description = $("#txtDescription").val();
        let unitPrice = $("#txtUnitPrice").val();
        let qty = $("#txtItemQTY").val();

        for (let i = 0; i < itemTable.length; i++) {
            if (itemTable[i].getCode() === code ) {
                itemTable[i].setDescription(description);
                itemTable[i].setQty(qty);
                itemTable[i].setUnitPrice(unitPrice);
            }
        }
        getAllItems();
        alert("Item was updated!");
        setItemDetailsValue("", "", "");
        $("#txtSearchItem").val("");
    } else {
        alert("Select an Item to Update!");
    }
});

/*Remove an Item*/
$("#btnRemoveItem").click(function () {
    if ($("#txtDescription").val().length !== 0) {
        let code = $("#txtSearchItem").val();

        for (let i = 0; i < itemTable.length; i++) {
            if (itemTable[i].getCode() === code ) {
                itemTable.splice(i, 1);
            }
        }
        getAllItems();
        alert("Item was deleted!");
        generateItemCode();
        setItemDetailsValue("", "", "");
        $("#txtSearchItem").val("");
    } else {
        alert("Select an Item to Remove!");
    }
});

/*Search an Item*/
$("#txtSearchItem").on("keyup", function () {
    $("#tblItems-manage-items > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let code = $("#txtSearchItem").val();
    for (let i = 0; i < itemTable.length; i++) {
        if (itemTable[i].getCode().toLowerCase() === code.toLowerCase() ) {
            setItemDetailsValue(itemTable[i].getDescription(), itemTable[i].getQty(), itemTable[i].getUnitPrice());
            return;
        }
    }
    setItemDetailsValue("", "", "");
});

/*Regex*/
function checkItemRegex(pattern, value) {
    return pattern.test(value);
}

/*Item description field validate*/
$("#txtDescription").on("keyup", function (event) {
    let description_alert = $("#description-alert");
    if (checkItemRegex(/^[A-z 0-9 ()]{1,}$/, $("#txtDescription").val())) {
        description_alert.text("");
        if (event.key === "Enter") {
            $("#txtItemQTY").focus();
        }
    } else {
        description_alert.text("Cannot add symbols (!,@,#,$,%,^,*,\\,/.)");
        description_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});

/*Item qty field validate*/
$("#txtItemQTY").on("keyup", function (event) {
    let qty_alert = $("#qty-alert");
    if (checkItemRegex(/^[0-9]{1,}$/, $("#txtItemQTY").val())) {
        qty_alert.text("");
        if (event.key === "Enter") {
            $("#txtUnitPrice").focus();
        }
    } else {
        qty_alert.text("Only add numbers (1234..)");
        qty_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});

/*Item unitPrice field validate*/
$("#txtUnitPrice").on("keyup", function (event) {
    let unitePrice_alert = $("#unitPrice-alert");
    if (checkItemRegex(/^[0-9.]{1,}$/, $("#txtUnitPrice").val())) {
        unitePrice_alert.text("");
        if (event.key === "Enter") {
            addItem();
        }
    } else {
        unitePrice_alert.text("Only add numbers (1234..)");
        unitePrice_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});


