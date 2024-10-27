const authController ={};
const User = require('../models/User');
const bcryptjs = require('bcryptjs');


authController.loginWithEmail = async (req, res) => {
    console.log("Login attempt:", req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
        if (user) {
            const isMatch = await bcryptjs.compare(password, user.password);             
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch (error) {
        res.status(400).json({ status: "fail2", error: error.message });
    }
};


module.exports = authController;