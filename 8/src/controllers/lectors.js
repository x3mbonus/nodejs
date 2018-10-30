import { Router } from 'express';
import { lectors } from '../views';
import authMiddleware from './authMiddleware';

export const router = new Router();
export const adminRouter = new Router();

adminRouter.use("/create", authMiddleware).route("/create").post(lectors.create);
adminRouter.use("/delete/:id", authMiddleware).route("/delete/:id").delete(lectors.remove);
adminRouter.use("/update/:id", authMiddleware).route("/update/:id").put(lectors.update);
router.route("/all").get(lectors.all);
router.route("/:id").get(lectors.get);