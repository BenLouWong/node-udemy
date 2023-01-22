import { User } from "../types/apiTypes";

export function checkIfUser(user: unknown): User[] {
    if (!isUser(user)) {
        throw new Error('test');
    }

    return user;
}

function isUser(users: unknown): users is User[] {
    return 'email' in users[0];
}


