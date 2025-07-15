import jwt from 'jsonwebtoken';
import pkg from 'mongodb';
import {getDbConnection} from "../db.js";
import mongodb from "mongodb";
const {ObjectId} = mongodb;

export const updateUserInfoRoute ={
    path:'/api/users/:userId',
    method:'put',
    handler:async (req,res)=>{
        const db = getDbConnection('auth-db')
        const { authorization } = req.headers;
        const {userId} = req.params;

        const updates1 = (({
            name,
            age,
            interests,
            createTrip
        })=>({
            name,
            age,
            interests,
            createTrip
        }))(req.body)

        if (!authorization){
            return res.status(401).json({message:"Not authorized"})
        }

        const token = authorization.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err){
                return res.status(401).json({message:"Unauthorized"})
            }
            const {id} = decoded;

            if(id!==userId){
                return res.status(403).json({message:"Not allowed to update user"})
            }

            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: { info:updates1 } },
                {returnOriginal:false}
            )
            const {username, isVerified,info} = result.value
            jwt.sign({id, username, isVerified,info}, process.env.JWT_SECRET, {expiresIn: '2d'},(err, token) => {
                if (err){
                    return res.status(200).json(err)
                }
                res.status(200).json({token})

            })
        })
    }
}