"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cart = /** @class */ (function () {
    function Cart(od) {
        this.orderDetails = od;
    }
    return Cart;
}());
exports.Cart = Cart;
function getCart(od) {
    return new Cart(od);
}
exports.getCart = getCart;
;
//# sourceMappingURL=cart.module.js.map