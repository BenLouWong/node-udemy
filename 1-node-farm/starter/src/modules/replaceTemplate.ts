import { Product } from "../types/product";

export function replaceTemplate(templateCard: string, product: Product): string {
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
