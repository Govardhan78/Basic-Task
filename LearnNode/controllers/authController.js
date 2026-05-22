const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

exports.signup = async (req, res )=>{
    try{
        const {name , email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
            token: generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }else{
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to login",
            error: error.message,
        });
    }
}