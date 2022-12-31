import fs from 'fs';
import http from 'http';
import path from 'path';

__dirname = path.resolve(path.dirname(''));

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

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = readApiResponse(productData);

function createBasicServer(): void {
    const server = http.createServer((req, res) => {
        const pathName = req.url as PathName;
        switch (pathName) {
            case '/':
            case '/overview': {
                res.writeHead(200, { 'Content-type': 'text/html' });

                const cardsHtml = products.map(el => replaceTemplate(templateCard, el)).join('');
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
                res.write(JSON.stringify(products));
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

function readApiResponse(data: string): Product[] {
    const product = JSON.parse(data) as Product[];
    return product;
}

function replaceTemplate(templateCard: string, product: Product): string {
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

type PathName = '/overview' | '/product' | '/' | '/api';

interface Product {
    id: number;
    productName: string;
    image: string;
    from: string;
    nutrients: string;
    quantity: string;
    price: string;
    organic: boolean;
    description: string;
}
