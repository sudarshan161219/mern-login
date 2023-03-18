import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

const connect = async () => {

const mongo = await MongoMemoryServer.create();
const getUri = mongo.getUri()

mongoose.set('strictQuery', true)
const db = await mongoose.connect(getUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
console.log("Database Connected...");
return db;

}

export default connect