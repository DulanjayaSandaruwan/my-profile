function Orders(oid, cid, date, discount, tot) {
    this.__oid = oid;
    this.__cid = cid;
    this.__date = date;
    this.__discount = discount;
    this.__tot = tot;

    this.getOid = function () {
        return this.__oid;
    }
    this.setOid = function (oid) {
        this.__oid = oid;
    }

    this.getCustID = function () {
        return this.__cid;
    }
    this.setCustId = function (cid) {
        this.__cid = cid;
    }

    this.getDate = function () {
        return this.__date;
    }
    this.setDate = function (date) {
        this.__date = date;
    }

    this.getDiscount = function () {
        return this.__discount;
    }
    this.setDiscount = function (discount) {
        this.__discount = discount;
    }

    this.getTot = function () {
        return this.__tot;
    }
    this.setTot = function (tot) {
        this.__tot = tot;
    }
}