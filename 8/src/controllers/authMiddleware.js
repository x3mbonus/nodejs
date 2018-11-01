import {users} from "../views";

export default function authMiddleware(req, res, next){

    users.verify(req, (err) => {
        if (err) {
            res.status(403).json(({Error: err}));
            return;
        }
        next();
    });
}
