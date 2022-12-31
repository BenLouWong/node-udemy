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
const fileData = fs_1.default.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = readApiResponse(fileData);
function createBasicServer() {
    const server = http_1.default.createServer((req, res) => {
        const pathName = req.url;
        switch (pathName) {
            case '/':
            case '/overview':
                res.end('This is the OVERVIEW');
                break;
            case '/product':
                res.end('This is the PRODUCT');
                break;
            case '/api':
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.write(JSON.stringify(productData));
                res.end();
                break;
            default:
                res.writeHead(404, {
                    'Content-type': 'text/html'
                });
                res.end('<h1>404 Page not found</h1>');
                break;
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
//# sourceMappingURL=app.js.map