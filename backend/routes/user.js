const express = require("express");
const zod = requier("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authmiddleware } = require("../middleware")
const router = express.Router();

const signupSchema = zod.object({
    username: zod.sring().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup",async (req, res) =>{
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email is already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email is already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    //creating an account with some random amount

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId  
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

})


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) =>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message: "Email is already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().option(),
    firstName: zod.string().option(),
    lastName: zod.string().option()
})

router.put("/",authmiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.findOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "User updated successfully"
    })
})

router.get("/bulk",async (req, res)=>{
    const filter = req.query.filter || "";

    const users = await User.findOne({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;