import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        
        const connectionString = "mongodb://127.0.0.1:27017/Webcraft"

        const connect = await mongoose.connect(connectionString)

        if (connect){
            console.log("Database Connected");
            
        }
    } catch (error) {
        console.log(`Error in Connecting Databasr ${error}`);
        
    }
}

export default connectDb