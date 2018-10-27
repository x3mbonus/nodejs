import { Router } from 'express';
import { courses } from '../views';

const router = new Router();

router.route("/all").get(courses.all);
router.route("/create").post(courses.create);
router.route("/delete/:id").delete(courses.remove);
router.route("/update/:id").post(courses.update);
router.route("/:id").get(courses.get);


export default router;