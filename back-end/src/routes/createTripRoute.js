import mongodb from 'mongodb';
import { getDbConnection } from '../db.js';

const { ObjectId } = mongodb;

export const addTripRoutes= {
    path: '/api/users/:userId/trips',
    method:'get',
    handler:async (req,res)=>{
        const { userId } = req.params;
        const db = getDbConnection('auth-db'); // replace with your actual db name

        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const trips = user.info?.createTrip || [];
            res.json({ trips });
        } catch (error) {
            console.error('Error fetching trips:', error);
            res.status(500).json({ message: 'Error retrieving trips', error });
        }
    }
};
