import { User } from "../../database/model.js";

async function checkStatus(req, res) {
    if(req.session.user) {
        let user = {...req.session.user};
        delete user.password;
        res.status(200).json({ user: req.session.user, loggedIn: true });
        return
    } else {
        res.status(200).json({ user: null, loggedIn: false });
        return
    };
};

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({where: {username: username}});

    if(user && user.password === password) {
        req.session.user = user;
        let userCopy = {...user.toJSON()};
        delete userCopy.password;
        console.log(req.session)
        res.json({success: true, user: userCopy});
        return
    } else {
        res.json({success: false});
        return
    };
};

async function logout(req,res) {
    req.session.destroy();
    res.json({success: true});
    return;
};

async function register(req, res) {
    const { username, password } = req.body;
    if(username && password) {
        let user = await User.findOne({where: {username: username}});
        if(user) {
            res.status(401).json({error: "User already exists."});
            return
        } else {
            user = await User.create({username, password});
            req.session.user = user;
            let userCopy = {...user.toJSON()};
            delete userCopy.password
            res.status(200).json({success: true, user: userCopy});
            return;
        };
    } else {
        res.status(401).json({error: "Information missing."})
        return;
    };
};

export { checkStatus, login, logout, register };