import mongodb from 'mongodb';
import { getDbConnection } from '../db.js';


export const getTripRoutes= {
    path: '/api/trips',
    method:'get',
    handler:async (req,res)=>{
        const db = getDbConnection('auth-db'); // replace with your actual db name

        try {
            const tripsCursor = db.collection('trips').find();
            const tripsArray = await tripsCursor.toArray();

            if (!tripsArray || tripsArray.length === 0) {
                return res.status(404).json({ message: 'No trips found' });
            }

            const sanitizedTrips = tripsArray.map(trip => ({
                ...trip,
                _id: trip._id.toString(),
            }));

            res.status(200).json({ trips: sanitizedTrips });
        } catch (error) {
            console.error('Error fetching trips:', error);
            res.status(500).json({ message: 'Error retrieving trips', error });
        }
    }
};
