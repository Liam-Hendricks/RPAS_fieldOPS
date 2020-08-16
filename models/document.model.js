const mongoose = require('mongoose');


//document Schema
let documentSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique:true
      },
    FieldOps:{
        type:String,
        required:true
    },
	 user:{
        type: String,
        required: true,  
     },
     file: 
    {  
         type: String, 
         required: true,  
    },
    fileType:{
        type:String,
        required: true,
    },
    docType:{
        type:String,
        required:true
    }
},{ timestamps: true });


module.exports = mongoose.model('documents', documentSchema);