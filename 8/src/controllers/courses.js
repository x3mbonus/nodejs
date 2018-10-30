import { Router } from 'express';
import { courses } from '../views';
import authMiddleware from './authMiddleware';


export const router = new Router();


router.use("/create", authMiddleware).route("/create").post(courses.create);
router.use("/delete/:id", authMiddleware).route("/delete/:id").delete(courses.remove);
router.use("/update/:id", authMiddleware).route("/update/:id").put(courses.update);
router.route("/all").get(courses.all);
router.route("/:id").get(courses.get);