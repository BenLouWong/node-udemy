"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTemplate = void 0;
function replaceTemplate(templateCard, product) {
    let output = templateCard.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%PRODUCTIMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
    output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCTLOCATION%}/g, product.from);
    output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id.toString());
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}
exports.replaceTemplate = replaceTemplate;
//# sourceMappingURL=replaceTemplate.js.map