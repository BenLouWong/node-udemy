"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
__dirname = path_1.default.resolve(path_1.default.dirname(''));
// function synchronousCall(): void {
//     const readFileText = fs.readFileSync('./txt/input.txt', 'utf-8');
//     console.log(readFileText);
//     const textOut = `This is what we know about the avocado: ${readFileText}\nCreated on ${new Date().toISOString()}`;
//     fs.writeFileSync('./txt/output.txt', textOut);
//     console.log('File written');
// }
// synchronousCall();
// function asynchronousCall(): void {
//     fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//         fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//             console.log(data2);
//             fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//                 console.log(data3);
//                 fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', () => {
//                     console.log('File written');
//                 });
//             });
//         });
//     });
// }
// asynchronousCall();
// console.log('Will read file!');
const templateOverview = fs_1.default.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs_1.default.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs_1.default.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const fileData = fs_1.default.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = readApiResponse(fileData);
function createBasicServer() {
    const server = http_1.default.createServer((req, res) => {
        const pathName = req.url;
        switch (pathName) {
            case '/':
            case '/overview': {
                res.writeHead(200, { 'Content-type': 'text/html' });
                const cardsHtml = productData.map(el => replaceTemplate(templateCard, el)).join('');
                const output = templateOverview.replace('{%PRODUCTCARDS%}', cardsHtml);
                res.end(output);
                break;
            }
            case '/product': {
                res.end('This is the PRODUCT');
                break;
            }
            case '/api': {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.write(JSON.stringify(productData));
                res.end();
                break;
            }
            default: {
                res.writeHead(404, {
                    'Content-type': 'text/html'
                });
                res.end('<h1>404 Page not found</h1>');
                break;
            }
        }
    });
    server.listen(9000, '127.0.0.1', () => {
        console.log('Listening to requests on port 9000');
    });
}
createBasicServer();
function readApiResponse(data) {
    const product = JSON.parse(data);
    return product;
}
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
//# sourceMappingURL=app.js.map