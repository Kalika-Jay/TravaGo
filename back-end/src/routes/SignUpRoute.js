import {getDbConnection} from "../db.js";
import jwt from 'jsonwebtoken';
import bcrpt from "bcrypt";

export const signUpRoute ={
    path:'/api/signup',
    method:'post',
    handler:async (req,res)=>{
        const {email, password} = req.body;

        const db =getDbConnection('auth-db')
        const user = await db.collection('users').findOne({email});

        if (user){
            res.status(409).send({user});
        }
        const passwordHash = await bcrpt.hash(password,10);

        const strartingInfo = {
            name:'',
            age:''
        }
        const result = await db.collection('users').insertOne({
            email,passwordHash,info: strartingInfo,isVerified: false,
        });
        const {insertedId} = result;

        jwt.sign({
            id:insertedId,
            email,
            info:strartingInfo,
            isVerified:false,
        },
        process.env.JWT_SECRET,
            {expiresIn: '2d'},
            (err, token) => {
            if(err){
                return res.status(500).send({err});
            }
            res.status(200).json({token});
            }
            )
    }
}