import { User } from '../models'
import jwt from 'jsonwebtoken';

const secretKey = 'asdsadasdasdasdsadas';


function getToken(userName){
      var token = jwt.sign({
        data: {
            user:userName
        }
      }, secretKey, { expiresIn: '1m' });

    return token;
}

async function signUp(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        res.status(400).json({Error: `Email or password is missing`});
        return;
    }
    
    try {
        let user = await User.findOne({email: email});
        
        if (user)
        {
            res.status(400).json({Error: `User with email ${email} already exists`});
            return;
        }
        user = new User({
            email: email,
            password: password
        });

        await user.save();
        let token = getToken(user.email);
        res.status(200).json({token: token});
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};


async function signIn(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        res.status(400).json({Error: `Email or password is missing`});
        return;
    }
    
    try {
        let user = await User.findOne({email: email});
        if (!user)
        {
            res.status(400).json({Error: `Cannot find user with email ${email}`});
            return;
        }
        if (user.password !== password){
            res.status(400).json({Error: `Check your password`});
            return;
        }
        let token = getToken(user.email);
        res.status(200).json({token: token});
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};

function isAuthorized(req, res) {
    verify(req, function(err, decoded) {
        if (err) {
            res.status(200).json({IsAuthorized:false, Message: err});
            return;
        }
        res.status(200).json({IsAuthorized:true, User: decoded.user});
      });
}


function verify(req, callback){
    let token = req.headers.authorization;

    if (!token){
        callback('Authorization header is missing');
        return;
    }

    jwt.verify(token, secretKey, callback);
}


export let users =
{
    signIn,
    signUp,
    verify,
    isAuthorized
};