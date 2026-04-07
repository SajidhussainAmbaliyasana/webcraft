import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        
        const connectionString = process.env.MONGO_DB_URL;

        const connect = await mongoose.connect(connectionString)

        if (connect){
            console.log("Database Connected");
            
        }
    } catch (error) {
        console.log(`Error in Connecting Databasr ${error}`);
        
    }
}

export default connectDb