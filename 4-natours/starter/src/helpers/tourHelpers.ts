import { Tours } from "../types/apiTypes";

export function checkIfTours(tours: unknown): Tours[] {
    if (!isTours(tours)) {
        throw new Error('test');
    }

    return tours;
}

function isTours(tours: unknown): tours is Tours[] {
    return 'ratingsAverage' in tours[0];
}

