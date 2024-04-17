import { mongoose } from "mongoose";


export const connectDB = (url)=>{
    mongoose
    .connect(url)
    .then(()=>console.log('mongoos is active'))
    .catch((err)=>console.log('wtf is mongo doing', err.message))
};

