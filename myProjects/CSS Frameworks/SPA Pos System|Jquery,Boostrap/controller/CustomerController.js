/*Generate Item Code*/
function generateCustomerId() {
    try {
        let lastCustomerId = customerTable[customerTable.length-1].getCid();
        let newCustomerId = parseInt(lastCustomerId.substring(1,4))+1;
        if (newCustomerId < 10) {
            $("#customer-id").text("C-00"+newCustomerId);
        }else if (newCustomerId < 100) {
            $("#customer-id").text("C-0"+newCustomerId);
        } else {
            $("#customer-id").text("C-"+newCustomerId);
        }
    } catch (e) {
        $("#customer-id").text("C-001");
    }

}
generateCustomerId();

/*Add customer to Customer table*/
$("#btnAddCustomer").click(function () {
   addCustomer();
});
function addCustomer() {
    let cid = $("#customer-id").text().substring(1);
    let name = $("#txtCustomerName");
    let address = $("#txtCustomerAddress").val();
    let contact = $("#txtCustomerContact").val();


    if (name.length !==0 && address.length !==0 && contact.length !==0) {
        customerTable.push(new Customer(cid, name.val(), address, contact));
        getAllCustomers();
        setCustomerDetailsValue("", "", "");
        generateCustomerId();
        name.focus();
        addValuesToCmbCustomers("<option>"+cid+"</option>");
        addValuesToCmbCustomer_ManageOrdersForm("<option>"+cid+"</option>");
    } else {
        alert("Fields cannot be empty!");
    }
}

function setCustomerDetailsValue(name, address, contact) {
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}

function getAllCustomers() {
    $("#tblCustomers > tbody").empty();
    for (let i = 0; i < customerTable.length; i++) {
        $("#tblCustomers > tbody").append("<tr>" +
            "<td>"+customerTable[i].getCid()+"</td>" +
            "<td>"+customerTable[i].getName()+"</td>" +
            "<td>"+customerTable[i].getAddress()+"</td>" +
            "<td>"+customerTable[i].getContact()+"</td>" +
            "</tr>");
    }
}

/*Select customer from Customer table*/
$("#tblCustomers > tbody").on("click", "tr", function () {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let selectedRow = $(this).closest("tr");
    $(this).css({
        "background-color" : "#a7a7a7",
        "color" : "white"
    });

    let cid = selectedRow.find("td:eq(0)").text();
    let name = selectedRow.find("td:eq(1)").text();
    let address = selectedRow.find("td:eq(2)").text();
    let contact = selectedRow.find("td:eq(3)").text();

    setCustomerDetailsValue(name, address, contact);
    $("#txtSearchCustomer").val(cid);
});

/*Update a Customer*/
$("#btnUpdateCustomer").click(function () {
    if ($("#txtCustomerName").val().length !== 0) {
        let cid = $("#txtSearchCustomer").val();
        let name = $("#txtCustomerName").val();
        let address = $("#txtCustomerAddress").val();
        let contact = $("#txtCustomerContact").val();

        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getCid() === cid ) {
                customerTable[i].setName(name);
                customerTable[i].setAddress(address);
                customerTable[i].setContact(contact);
            }
        }
        getAllCustomers();
        alert("Customer was updated!");
        setCustomerDetailsValue("", "", "");
        $("#txtSearchCustomer").val("");
    } else {
        alert("Select a Customer to Update!");
    }
});

/*Remove a Customer*/
$("#btnRemoveCustomer").click(function () {
    if ($("#txtCustomerName").val().length !== 0) {
        let cid = $("#txtSearchCustomer").val();

        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getCid() === cid ) {
                customerTable.splice(i, 1);
            }
        }
        getAllCustomers();
        alert("Customer was deleted!");
        generateCustomerId();
        setCustomerDetailsValue("", "", "");
        $("#txtSearchCustomer").val("");

        let cmbCustomer = document.getElementById("cmbCustomers");
        let cmbCustomer_ManageOrderForm = document.getElementById("cmbCustomerId-ManageOrders");
        for (let i = 0; i < cmbCustomer.length; i++) {
            if (cmbCustomer.options[i].innerText === cid) {
                cmbCustomer.remove(i);
                cmbCustomer_ManageOrderForm.remove(i);
            }
        }
    } else {
        alert("Select a Customer to Remove!");
    }
});

/*Search a Customer*/
$("#txtSearchCustomer").on("keyup", function () {
    $("#tblCustomers > tbody > tr").css({
        "background-color" : "initial",
        "color" : "initial"
    });
    let cid = $("#txtSearchCustomer").val();
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCid().toLowerCase() === cid.toLowerCase() ) {
            setCustomerDetailsValue(customerTable[i].getName(), customerTable[i].getAddress(), customerTable[i].getContact());
            return;
        }
    }
    setCustomerDetailsValue("", "", "");
});

/*Regex*/
function checkCustomerRegex(pattern, value) {
    return pattern.test(value);
}

/*Customer name field validate*/
$("#txtCustomerName").on("keyup", function (event) {
    let name_alert = $("#name-alert");
    if (checkCustomerRegex(/^[A-z ]{1,}$/, $("#txtCustomerName").val())) {
        name_alert.text("");
        if (event.key === "Enter") {
            $("#txtCustomerAddress").focus();
        }
    } else {
        name_alert.text("Only add letters (A,B,C,a,b,c,..)");
        name_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});

/*Customer address field validate*/
$("#txtCustomerAddress").on("keyup", function (event) {
    let address_alert = $("#address-alert");
    if (checkCustomerRegex(/^[A-z .,/0-9]{1,}$/, $("#txtCustomerAddress").val())) {
        address_alert.text("");
        if (event.key === "Enter") {
            $("#txtCustomerContact").focus();
        }
    } else {
        address_alert.text("Check again!");
        address_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});

/*Customer contact field validate*/
$("#txtCustomerContact").on("keyup", function (event) {
    let contact_alert = $("#contact-alert");
    if (checkCustomerRegex(/^[0-9 -]{1,}$/, $("#txtCustomerContact").val())) {
        contact_alert.text("");
        if (event.key === "Enter") {
            addCustomer();
        }
    } else {
        contact_alert.text("Only add numbers (1234..)");
        contact_alert.css({
            "color" : "red",
            "font-size" : "13px"
        });
    }
});