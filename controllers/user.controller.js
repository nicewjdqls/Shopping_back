const usercontroller = {};
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

usercontroller.createUser = async (req, res) => {
    console.log("Received user data:", req.body); // 전달된 데이터 확인

    try{
        const {email, name, password, level} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Error("이미 가입된 유저입니다.");
        }
        const saltRound = bcryptjs.genSaltSync(10);
        const hash = await bcryptjs.hash(password, saltRound);
        const newUser = new User({email, name, password : hash, level:level?level:'customer'});
        await newUser.save();
        res.status(200).json({status : "success"});
        console.log("hash : ", hash);
    }catch(error){
        res.status(400).json({status : "fail", error : error.message});

    }
    
};

module.exports = usercontroller;