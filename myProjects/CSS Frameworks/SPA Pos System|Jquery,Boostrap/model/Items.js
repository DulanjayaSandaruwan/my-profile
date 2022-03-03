function Item(code, description, qty, unitPrice) {
    let __code = code;
    let __description = description;
    let __qty = qty;
    let __unitPrice = unitPrice;

    this.getCode = function () {
        return __code;
    }
    this.setCode = function (code) {
        __code = code;
    }

    this.getDescription = function () {
        return __description;
    }
    this.setDescription = function (description) {
        __description = description;
    }

    this.getQty = function () {
        return __qty;
    }
    this.setQty = function (qty) {
        __qty = qty;
    }

    this.getUnitPrice = function () {
        return __unitPrice;
    }
    this.setUnitPrice = function (unitPrice) {
        __unitPrice = unitPrice;
    }
}