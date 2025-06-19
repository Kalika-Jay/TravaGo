import mongodb from 'mongodb';
const {MongoClient} = mongodb;

let client;

export const initializeDbConnection = async () => {
    const uri = 'mongodb://localhost:27017';
    client = new MongoClient(uri); // No options needed unless special case
    await client.connect();
};

export const getDbConnection = (dbName) => {
    if (!client) {
        throw new Error('Database not initialized. Call initializeDbConnection() first.');
    }
    return client.db(dbName);
};
