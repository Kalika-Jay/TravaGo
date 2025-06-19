import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";
import {getDbConnection} from "../db.js";

export const loginRoute={
    path:"/api/login",
    method:"post",
    handler:async (req, res) => {
        const {email, password} = req.body;

        const db =getDbConnection('auth-db');

        const user = await db.collection('users').findOne({email});

        if (!user){
            return res.status(401).send({})
        }
        const {_id:id,isVerified,passwordHash,info} = user;
        const isCorrect = await bcrpt.compare(password, passwordHash);

        if (isCorrect) {
            jwt.sign({id, isVerified,email,info},process.env.JWT_SECRET,{expiresIn: '2d'},(err,token)=>{
                if (err){
                    res.status(500).json({err});
                }
                res.status(200).json({token});
            });
        }
        else{
            res.status(401).send({})
        }
    }
}