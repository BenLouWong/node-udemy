import { Router } from "express";
import { UsersResource } from "../services/usersResource";
import fs from 'fs';
import { checkIfUser } from "../helpers/userHelpers";

export const router = Router();
const users = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/users.json`, 'utf-8'));

const userDataService = new UsersResource(checkIfUser(users));
router.route('/')
    .get(userDataService.getAllUsers)
    .post(userDataService.createUser);

router.route('/:id')
    .get(userDataService.getUserById)
    .patch(userDataService.updateUser)
    .delete(userDataService.deleteUser);

