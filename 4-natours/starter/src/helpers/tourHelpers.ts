// import { Tours } from "../types/apiTypes";

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`, 'utf-8'));


// export function checkIfTours(tours: unknown): Tours[] {
//     if (!isTours(tours)) {
//         throw new Error('test');
//     }

//     return tours;
// }

// export function checkPayloadBody(req: Request, res: Response, next: NextFunction): Response {
//     console.log('Checking Payload Body');
//     const { name, price } = req.body as Tours;
//     if (!name || !price) {
//         return res.status(406).json({
//             status: 'fail',
//             message: req.body
//         });
//     }
//     next();
// }

// export function checkTourId(req: Request, res: Response, next: NextFunction): Response {
//     console.log('Check Tour ID');
//     if (+req.params.id > checkIfTours(tours).length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }
//     next();
// }

// function isTours(tours: unknown): tours is Tours[] {
//     return 'ratingsAverage' in tours[0];
// }
