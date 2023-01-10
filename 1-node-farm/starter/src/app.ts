import fs from 'fs';
import http from 'http';
import path from 'path';
import slugify from 'slugify';
import { replaceTemplate } from './modules/replaceTemplate.js';
import { Product } from './types/product';

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

const slugs = products.map(el => slugify(el.productName, { lower: true }))
console.log(slugs);

function handler(): void {
    const server = http.createServer((req, res) => {
        const baseURL = `http://${req.headers.host}`;
        const requestURL = new URL(req.url, baseURL);

        const pathname = requestURL.pathname as PathName;
        const query = requestURL.searchParams.get('id');
        switch (pathname) {
            case '/':
            case '/overview': {
                res.writeHead(200, { 'Content-type': 'text/html' });

                const cardsHtml = products.map(el => replaceTemplate(templateCard, el)).join('');
                const output = templateOverview.replace('{%PRODUCTCARDS%}', cardsHtml);
                res.end(output);
                break;
            }
            case '/product': {
                const product = products[query];
                const output = replaceTemplate(templateProduct, product);
                res.end(output);
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
handler();

function readApiResponse(data: string): Product[] {
    const product = JSON.parse(data) as Product[];
    return product;
}

type PathName = '/overview' | '/product' | '/' | '/api';
