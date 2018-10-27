import { Router } from 'express';
import { students } from '../views';

const router = new Router();

router.route("/all").get(students.all);
router.route("/create").post(students.create);
router.route("/delete/:id").delete(students.delete);
router.route("/update/:id").put(students.update);
router.route("/:id").get(students.get);


export default router;