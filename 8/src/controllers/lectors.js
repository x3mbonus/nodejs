import { Router } from 'express';
import { lectors } from '../views';

const router = new Router();

router.route("/all").get(lectors.all);
router.route("/create").post(lectors.create);
router.route("/delete/:id").delete(lectors.delete);
router.route("/update/:id").put(lectors.update);
router.route("/:id").get(lectors.get);


export default router;