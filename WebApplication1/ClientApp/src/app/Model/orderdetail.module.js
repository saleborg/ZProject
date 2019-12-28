"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderDetail = /** @class */ (function () {
    function OrderDetail(product, price, units) {
        this.price = price;
        this.units = units;
        this.product = product;
    }
    return OrderDetail;
}());
exports.OrderDetail = OrderDetail;
function getOrderDetail(product, price, units) {
    return new OrderDetail(product, price, units);
}
exports.getOrderDetail = getOrderDetail;
;
//# sourceMappingURL=orderdetail.module.js.map