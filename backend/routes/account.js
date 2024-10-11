const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db")
const mongoose = require("mongoose")

router.get("/balance", authMiddleware, async(req, res) => {
    const account = Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    
    //Fetch the account within transaction

    const account = await Account.findOne({ userId : req.userId }).session(session);
    if (!account || account.balance < amount ){
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!account){
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        })
    }

    //perform transactions

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount }}).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount }}).session(session);

    //committing the transaction

    await session.commitTransaction();
    res.json({
        message: "amount transfered successfully"
    })
});

module.exports= router;