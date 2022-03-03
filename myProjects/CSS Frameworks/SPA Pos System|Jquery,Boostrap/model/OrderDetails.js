function OrderDetail(oid, code, qty, totAmount) {
    this.__oid = oid;
    this.__code = code;
    this.__qty = qty;
    this.__totAmount = totAmount;

    this.getOrderid = function () {
        return this.__oid;
    }
    this.setOrderid = function (oid) {
        this.__oid = oid;
    }

    this.getItemCode = function () {
        return this.__code;
    }
    this.setItemCode = function (code) {
        this.__code = code;
    }

    this.getItemQty = function () {
        return this.__qty;
    }
    this.setItemQty = function (qty) {
        this.__qty = qty;
    }

    this.getTotAmount = function () {
        return this.__totAmount;
    }
    this.setTotAmount = function (totAmount) {
        this.__totAmount = totAmount;
    }
}