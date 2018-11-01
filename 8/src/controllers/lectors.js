import { Router } from 'express';
import { lectors } from '../views';
import authMiddleware from './authMiddleware';

export const router = new Router();

router.use("/create", authMiddleware).route("/create").post(lectors.create);
router.use("/delete/:id", authMiddleware).route("/delete/:id").delete(lectors.remove);
router.use("/update/:id", authMiddleware).route("/update/:id").put(lectors.update);
router.route("/all").get(lectors.all);
router.route("/:id").get(lectors.get);