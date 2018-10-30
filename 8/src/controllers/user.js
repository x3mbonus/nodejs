import { Router } from 'express';
import { users } from '../views';

export const router = new Router();


router.route("/signUp").post(users.signUp);
router.route("/signIn").post(users.signIn);
router.route("/isAuthorized").get(users.isAuthorized);