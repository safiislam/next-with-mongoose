import mongoose from "mongoose"


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}


async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected to DB")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "", { dbName: "next-app" })
        connection.isConnected = db.connections[0].readyState
        console.log('DB Connection Successfully');
    } catch (error) {
        console.log('Database Connection Error', error);
        process.exit(1)
    }
}

export default dbConnect