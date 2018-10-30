import {users} from "../views";

export default function authMiddleware(req, res, next){
    if (!req.headers.authorization){
        res.status(403).json(({Error: 'Authorization header is missing'}));
        return;
    }

    if (req.headers.authorization !== users.getToken()){
        res.status(403).json({Error: 'Authorization header is incorrect'});
        return;
    }

    next();
}
