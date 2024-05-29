import express from "express"
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req,res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    try{
        await db.balance.update({
            where:{
                userId: paymentInformation.userId,
            },
            data:{
                amount:{
                    increment: paymentInformation.amount
                }
            }
        })
    
        await db.onRampTransaction.update({
            where:{
                token: paymentInformation.userId
            },
            data:{
                status: "Success"
            }
        })
    
        res.status(200).json({
            message:"captured"
        })
    }
    catch(e){
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    
    // Update balance in db, add txn
})