import { Router } from 'express';
import { students } from '../views';
import authMiddleware from './authMiddleware';

export const router = new Router();

router.use("/create", authMiddleware).route("/create").post(students.create);
router.use("/delete/:id", authMiddleware).route("/delete/:id").delete(students.remove);
router.use("/update/:id", authMiddleware).route("/update/:id").put(students.update);
router.route("/all").get(students.all);
router.route("/:id").get(students.get);