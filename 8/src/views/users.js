import { User } from '../models'

function getToken(){
    return 'Bearer: asdsadasdasdasdsadas';
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
        let token = getToken();
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
        let token = getToken();
        res.status(200).json({token: token});
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};

function isAuthorized(req, res){
    if (!req.headers.authorization ||
        req.headers.authorization !== users.getToken()) {
        res.status(200).json({IsAuthorized:false});
        return;
    }
    res.status(200).json({IsAuthorized:true});
}



export let users =
{
    signIn,
    signUp,
    getToken,
    isAuthorized
};