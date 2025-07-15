// routes/createTripRoute.js
import { getDbConnection } from '../db.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

export const tripsRoute = {
    path: '/api/trips',
    method: 'post',
    handler: async (req, res) => {
        const { tripTitle, tripLocation, tripDate, userId} = req.body;
        const db = getDbConnection('auth-db');
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });

        if (!tripTitle || !tripLocation || !tripDate || !userId) {
            return res.status(400).json({ message: 'Missing fields' });
        }


        try {
            const result = await db.collection('trips').insertOne({
                username:user.username,
                tripTitle,
                tripLocation,
                tripDate,
                userId: ObjectId(userId),
                createdAt: new Date()
            });

            res.status(201).json({ message: 'Trip created', tripId: result.insertedId });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Failed to create trip' });
        }
    }
};
