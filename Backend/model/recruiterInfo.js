import mongoose from 'mongoose';

const { Schema } = mongoose;

const recruit = new Schema({
    firstname : String ,
    lastname : String , 
    email : {type: String , unique:true}
});

const recruiter = mongoose.model('recruit' , recruit);

export default recruiter;