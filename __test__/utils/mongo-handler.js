import mongoose from "mongoose";

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {

    let options = {useNewUrlParser: true, useUnifiedTopology: true}
    await mongoose.connect(process.env.MONGO_URI, options)

}

/**
 * Drop database, close the connection and stop mongodb.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect()
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {

    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}